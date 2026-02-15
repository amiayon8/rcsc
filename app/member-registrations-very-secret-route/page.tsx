'use client';

import { useEffect, useState, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
    Search, RefreshCcw, Trash2, Edit, Check, X,
    MoreHorizontal, Download, Smartphone, Monitor, Globe
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, PieChart, Pie
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

// --- Supabase Client ---
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// --- Types ---
interface Registration {
    id: number;
    created_at: string;
    full_name: string;
    class_grade: string;
    section: string;
    c_no: string;
    wing: string;
    email: string;
    phone: string;
    whatsapp?: string;
    membership_type: 'with-tshirt' | 'without-tshirt';
    tshirt_size?: string;
    bkash_number: string;
    transaction_id: string;
    is_validated: boolean;
    user_agent?: string;
    ip_address?: string;
}

// --- Helper: Simple UA Parser ---
const parseUA = (ua: string) => {
    if (!ua) return { os: 'Unknown', browser: 'Unknown', device: 'Unknown' };
    const isMobile = /Mobile|Android|iPhone/i.test(ua);
    let os = 'Unknown OS';
    if (/Windows/i.test(ua)) os = 'Windows';
    else if (/Mac/i.test(ua)) os = 'MacOS';
    else if (/Android/i.test(ua)) os = 'Android';
    else if (/iOS|iPhone|iPad/i.test(ua)) os = 'iOS';
    else if (/Linux/i.test(ua)) os = 'Linux';

    let browser = 'Unknown Browser';
    if (/Chrome/i.test(ua)) browser = 'Chrome';
    else if (/Firefox/i.test(ua)) browser = 'Firefox';
    else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari';
    else if (/Edge/i.test(ua)) browser = 'Edge';

    return { os, browser, device: isMobile ? 'Mobile' : 'Desktop' };
};

export default function AdminDashboard() {
    const [data, setData] = useState<Registration[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Dialog States
    const [selectedReg, setSelectedReg] = useState<Registration | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    // --- 1. Fetch & Realtime Subscription ---
    useEffect(() => {
        fetchData();

        // Realtime Subscription
        const channel = supabase
            .channel('registrations_realtime')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'registrations' },
                (payload) => {
                    if (payload.eventType === 'INSERT') {
                        setData((prev) => [payload.new as Registration, ...prev]);
                    } else if (payload.eventType === 'DELETE') {
                        setData((prev) => prev.filter((item) => item.id !== payload.old.id));
                    } else if (payload.eventType === 'UPDATE') {
                        setData((prev) => prev.map((item) =>
                            item.id === payload.new.id ? (payload.new as Registration) : item
                        ));
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        const { data: regs, error } = await supabase
            .from('registrations')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && regs) setData(regs);
        setIsLoading(false);
    };

    // --- 2. Actions (Delete & Validate) ---
    const handleDelete = async () => {
        if (!deleteId) return;
        const { error } = await supabase.from('registrations').delete().eq('id', deleteId);
        if (error) console.error("Delete failed", error);
        setIsDeleteDialogOpen(false);
        setDeleteId(null);
    };

    const toggleValidation = async (id: number, currentStatus: boolean) => {
        const { error } = await supabase
            .from('registrations')
            .update({ is_validated: !currentStatus })
            .eq('id', id);
        if (error) console.error("Update failed", error);
    };

    // --- 3. Derived Stats ---
    const stats = useMemo(() => {
        const total = data.length;
        const verified = data.filter(d => d.is_validated).length;
        const revenue = data.reduce((acc, curr) => acc + (curr.membership_type === 'with-tshirt' ? 250 : 150), 0);

        // Wing Distribution for Pie Chart
        const wings: Record<string, number> = {};
        data.forEach(d => { wings[d.wing] = (wings[d.wing] || 0) + 1 });
        const wingData = Object.entries(wings).map(([name, value]) => ({ name, value }));

        // Class Distribution for Bar Chart
        const classes: Record<string, number> = {};
        data.forEach(d => { classes[d.class_grade] = (classes[d.class_grade] || 0) + 1 });
        const classData = Object.entries(classes).map(([name, value]) => ({ name, value }));

        return { total, verified, revenue, wingData, classData };
    }, [data]);

    // --- 4. Filtering ---
    const filteredData = useMemo(() => {
        return data.filter(item =>
            item.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.phone.includes(searchTerm) ||
            item.transaction_id.includes(searchTerm.toUpperCase())
        );
    }, [data, searchTerm]);

    const exportCSV = () => {
        const headers = ["ID", "Name", "Class", "Wing", "Phone", "TrxID", "Type", "Status"];
        const rows = data.map(d => [
            d.id, d.full_name, d.class_grade, d.wing, d.phone, d.transaction_id, d.membership_type, d.is_validated ? "Verified" : "Pending"
        ]);
        const csvContent = "data:text/csv;charset=utf-8,"
            + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "registrations.csv");
        document.body.appendChild(link);
        link.click();
    };

    return (
        <div className="z-20 relative space-y-8 bg-black p-8 pt-25 min-h-screen">

            {/* Header Section */}
            <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="font-bold text-gray-900 dark:text-white text-3xl tracking-tight">RCSC Dashboard</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage member registrations and payments.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={fetchData} disabled={isLoading}>
                        <RefreshCcw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>
                    <Button onClick={exportCSV}>
                        <Download className="mr-2 w-4 h-4" />
                        Export CSV
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard title="Total Members" value={stats.total} icon={<Globe className="text-blue-500" />} />
                <StatsCard title="Total Revenue" value={`৳ ${stats.revenue}`} icon={<Check className="text-green-500" />} sub="Estimated" />
                <StatsCard title="Verified" value={stats.verified} icon={<Check className="text-indigo-500" />} />
                <StatsCard title="Pending" value={stats.total - stats.verified} icon={<RefreshCcw className="text-orange-500" />} />
            </div>

            {/* Charts Section */}
            <div className="gap-4 grid grid-cols-1 lg:grid-cols-7">
                <Card className="col-span-1 lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Class Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="h-75">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.classData}>
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                                <RechartsTooltip
                                    contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                />
                                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="col-span-1 lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Wing Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="h-75">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={stats.wingData}
                                    cx="50%" cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {stats.wingData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={['#0ea5e9', '#22c55e', '#eab308', '#f43f5e'][index % 4]} />
                                    ))}
                                </Pie>
                                <RechartsTooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Data Table */}
            <Card >
                <CardHeader className="flex flex-row justify-between items-center">
                    <div>
                        <CardTitle>Registrations</CardTitle>
                        <CardDescription>Real-time list of all member submissions.</CardDescription>
                    </div>
                    <div className="relative w-64">
                        <Search className="top-2.5 left-2 absolute w-4 h-4 text-gray-500" />
                        <Input
                            placeholder="Search name, phone, TrxID..."
                            className="bg-zinc-100 dark:bg-zinc-900 pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-20">ID</TableHead>
                                <TableHead>Student</TableHead>
                                <TableHead>Class/Wing</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Payment</TableHead>
                                <TableHead>Device</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                                <TableHead className="w-12.5"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="h-24 text-gray-500 text-center">
                                        No results found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredData.map((reg) => {
                                    const ua = parseUA(reg.user_agent || '');
                                    return (
                                        <TableRow key={reg.id}>
                                            <TableCell className="font-mono text-gray-500 text-base">#{reg.id}</TableCell>
                                            <TableCell>
                                                <div className="font-medium">{reg.full_name}</div>
                                                <div className="text-gray-500 text-base">C/No. {reg.c_no}</div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="mr-1">{reg.class_grade}</Badge>
                                                <span className="text-gray-500 text-base">{reg.wing}</span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm">{reg.phone}</div>
                                                <div className="flex items-center gap-1 text-gray-500 text-base">
                                                    WB: {reg.whatsapp || '-'}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="bg-gray-100 dark:bg-zinc-800 px-1 py-0.5 rounded w-fit font-mono text-base">
                                                    {reg.transaction_id}
                                                </div>
                                                <div className="mt-0.5 text-gray-500 text-base">
                                                    {reg.membership_type === 'with-tshirt' ? `With T-Shirt (${reg.tshirt_size})` : 'Without T-Shirt'}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2 text-gray-500 text-base" title={reg.user_agent}>
                                                    {ua.device === 'Mobile' ? <Smartphone size={14} /> : <Monitor size={14} />}
                                                    {ua.os} / {ua.browser}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Badge
                                                    className={`cursor-pointer hover:opacity-80 text-base py-1 px-4 transition-opacity ${reg.is_validated ? 'bg-green-500' : 'bg-yellow-500'}`}
                                                    onClick={() => toggleValidation(reg.id, reg.is_validated)}
                                                >
                                                    {reg.is_validated ? 'Verified' : 'Pending'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="p-0 w-8 h-8">
                                                            <MoreHorizontal className="w-4 h-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem onClick={() => { setSelectedReg(reg); setIsDetailsOpen(true); }}>
                                                            View Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => { setDeleteId(reg.id); setIsDeleteDialogOpen(true); }} className="text-red-600 focus:text-red-600">
                                                            Delete Registration
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* --- Dialogs --- */}

            {/* Delete Confirmation */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent className='z-1001'>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the registration record from the database.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* View Details Dialog */}
            <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <DialogContent className="z-1001 max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Registration Details</DialogTitle>
                        <DialogDescription>
                            Detailed view of the submission.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedReg && (
                        <div className="gap-4 grid grid-cols-2 mt-4 text-sm">
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold text-gray-500 text-base uppercase">Personal Info</h4>
                                    <p className="font-medium text-lg">{selectedReg.full_name}</p>
                                    <p>{selectedReg.email}</p>
                                    <p>{selectedReg.phone}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-500 text-base uppercase">Academic</h4>
                                    <p>Class: {selectedReg.class_grade} | Section: {selectedReg.section}</p>
                                    <p>Wing: {selectedReg.wing} | ID: {selectedReg.c_no}</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold text-gray-500 text-base uppercase">Payment Info</h4>
                                    <p>bKash: {selectedReg.bkash_number}</p>
                                    <p className="inline-block bg-zinc-100 mt-1 p-1 rounded font-mono">
                                        TrxID: {selectedReg.transaction_id}
                                    </p>
                                    <p className="mt-1 text-gray-400 text-base">
                                        Time: {new Date(selectedReg.created_at).toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-500 text-base uppercase">Technical</h4>
                                    <p className="bg-zinc-50 mt-1 p-2 border rounded font-mono text-gray-500 text-base wrap-break-word">
                                        {selectedReg.user_agent}
                                    </p>
                                    <p className="mt-1 text-base">IP: {selectedReg.ip_address}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button onClick={() => setIsDetailsOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    );
}

// --- Subcomponent: Stats Card ---
function StatsCard({ title, value, icon, sub }: { title: string, value: string | number, icon: any, sub?: string }) {
    return (
        <Card >
            <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
                <CardTitle className="font-medium text-gray-500 dark:text-gray-400 text-sm">
                    {title}
                </CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="font-bold dark:text-white text-2xl">{value}</div>
                {sub && <p className="mt-1 text-gray-500 dark:text-gray-400 text-base">{sub}</p>}
            </CardContent>
        </Card>
    );
}