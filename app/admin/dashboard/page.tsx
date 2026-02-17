'use client';

import { useEffect, useState, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
    Search, RefreshCcw, Check,
    MoreHorizontal, Download, Smartphone, Monitor, Globe, Save, Loader2, Shirt, IdCard
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
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function checkUser() {
    const {
        data: { session },
        error,
    } = await supabase.auth.getSession()

    if (error) {
        return null
    }

    if (session) {
        return session.user
    } else {
        return null
    }
}

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
    tshirt_given?: boolean; // New field
    id_card_given?: boolean; // New field
    user_agent?: string;
    ip_address?: string;
}

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

    const [selectedReg, setSelectedReg] = useState<Registration | null>(null);
    const [formData, setFormData] = useState<Registration | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [actionLoading, setActionLoading] = useState<number | null>(null); // For row-specific loading

    const router = useRouter();

    useEffect(() => {
        const job = async () => {
            if (!(await checkUser())) {
                router.push('/');
            }
        }

        job();
    }, []);

    useEffect(() => {
        fetchData();

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

    useEffect(() => {
        if (selectedReg) {
            setFormData({ ...selectedReg });
        }
    }, [selectedReg]);

    const fetchData = async () => {
        setIsLoading(true);
        const { data: regs, error } = await supabase
            .from('registrations')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && regs) setData(regs);
        setIsLoading(false);
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        const { error } = await supabase.from('registrations').delete().eq('id', deleteId);
        if (error) toast.error("Delete failed");
        else toast.success("Registration deleted");
        setIsDeleteDialogOpen(false);
        setDeleteId(null);
    };

    const toggleValidation = async (id: number, currentStatus: boolean) => {
        setActionLoading(id);

        // Optimistic update
        const updatedData = data.map(item =>
            item.id === id ? { ...item, is_validated: !currentStatus } : item
        );
        setData(updatedData);

        const { error } = await supabase
            .from('registrations')
            .update({ is_validated: !currentStatus })
            .eq('id', id);

        if (error) {
            // Revert on error
            toast.error("Update failed");
            setData(data);
        } else {
            toast.success(currentStatus ? "Marked as Pending" : "Marked as Verified");
        }

        setActionLoading(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (!formData) return;
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // New handler for boolean toggles in dialog
    const handleCheckboxChange = (name: string, checked: boolean) => {
        if (!formData) return;
        setFormData({ ...formData, [name]: checked });
    };

    const handleSave = async () => {
        if (!formData) return;
        setIsSaving(true);

        const { error } = await supabase
            .from('registrations')
            .update({
                full_name: formData.full_name,
                class_grade: formData.class_grade,
                section: formData.section,
                c_no: formData.c_no,
                wing: formData.wing,
                email: formData.email,
                phone: formData.phone,
                whatsapp: formData.whatsapp,
                membership_type: formData.membership_type,
                tshirt_size: formData.tshirt_size,
                bkash_number: formData.bkash_number,
                transaction_id: formData.transaction_id,
                tshirt_given: formData.tshirt_given, // Save new field
                id_card_given: formData.id_card_given // Save new field
            })
            .eq('id', formData.id);

        setIsSaving(false);

        if (!error) {
            // Manually update frontend state immediately
            setData((prev) => prev.map((item) =>
                item.id === formData.id ? formData : item
            ));

            setIsDetailsOpen(false);
            toast.success("Registration updated successfully");
        } else {
            toast.error("Save failed");
        }
    };

    const stats = useMemo(() => {
        const total = data.length;
        const verified = data.filter(d => d.is_validated).length;
        // Updated logic for stats
        const idCardGiven = data.filter(d => d.id_card_given).length;
        const tShirtGiven = data.filter(d => d.membership_type === 'with-tshirt' && d.tshirt_given).length;

        const revenue = data.reduce((acc, curr) => acc + (curr.membership_type === 'with-tshirt' ? 250 : 150), 0);

        const wings: Record<string, number> = {};
        data.forEach(d => { wings[d.wing] = (wings[d.wing] || 0) + 1 });
        const wingData = Object.entries(wings).map(([name, value]) => ({ name, value }));

        const classes: Record<string, number> = {};
        data.forEach(d => { classes[d.class_grade] = (classes[d.class_grade] || 0) + 1 });
        const classData = Object.entries(classes).map(([name, value]) => ({ name, value }));

        return { total, verified, idCardGiven, tShirtGiven, revenue, wingData, classData };
    }, [data]);

    const filteredData = useMemo(() => {
        return data.filter(item =>
            item.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.phone.includes(searchTerm) ||
            item.transaction_id.includes(searchTerm.toUpperCase())
        );
    }, [data, searchTerm]);

    const exportCSV = () => {
        const headers = ["ID", "Name", "Class", "Wing", "Phone", "TrxID", "Type", "Status", "T-Shirt Given", "ID Given"];
        const rows = data.map(d => [
            d.id, d.full_name, d.class_grade, d.wing, d.phone, d.transaction_id, d.membership_type,
            d.is_validated ? "Verified" : "Pending",
            d.tshirt_given ? "Yes" : "No",
            d.id_card_given ? "Yes" : "No"
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
                    <h1 className="font-bold text-gray-900 dark:text-white text-3xl tracking-tight">Dashboard</h1>
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

                {/* New Stats Cards */}
                <StatsCard title="T-Shirts Given" value={stats.tShirtGiven} icon={<Shirt className="text-purple-500" />} />
                <StatsCard title="ID Cards Given" value={stats.idCardGiven} icon={<IdCard className="text-cyan-500" />} />
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
                                        {isLoading ? "Loading data..." : "No results found."}
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
                                                <Badge variant="outline" className="mr-1">{reg.class_grade}-{reg.section}-{reg.wing}</Badge>
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
                                                    className={`cursor-pointer hover:opacity-80 text-base py-1 px-4 transition-opacity ${reg.is_validated ? 'bg-green-500' : 'bg-yellow-500'} ${actionLoading === reg.id ? 'opacity-50 cursor-wait' : ''}`}
                                                    onClick={() => actionLoading !== reg.id && toggleValidation(reg.id, reg.is_validated)}
                                                >
                                                    {actionLoading === reg.id ? (
                                                        <Loader2 className="w-3 h-3 animate-spin" />
                                                    ) : (
                                                        reg.is_validated ? 'Verified' : 'Pending'
                                                    )}
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
                                                            View & Edit
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

            {/* View/Edit Details Dialog */}
            <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <DialogContent className="z-1001 max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Registration Details</DialogTitle>
                        <DialogDescription>
                            Edit and view submission details.
                        </DialogDescription>
                    </DialogHeader>
                    {formData && (
                        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 mt-4 text-sm">
                            {/* Personal Info - Editable */}
                            <div className="space-y-4">
                                <h4 className="pb-1 border-b font-semibold text-gray-500 text-xs uppercase tracking-wider">Personal Info</h4>
                                <div className="space-y-2">
                                    <label className="text-gray-500 text-xs">Full Name</label>
                                    <Input name="full_name" value={formData.full_name} onChange={handleInputChange} className="h-8" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-gray-500 text-xs">Email</label>
                                    <Input name="email" value={formData.email} onChange={handleInputChange} className="h-8" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-gray-500 text-xs">Phone</label>
                                    <Input name="phone" value={formData.phone} onChange={handleInputChange} className="h-8" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-gray-500 text-xs">WhatsApp</label>
                                    <Input name="whatsapp" value={formData.whatsapp || ''} onChange={handleInputChange} className="h-8" />
                                </div>
                            </div>

                            {/* Academic - Editable */}
                            <div className="space-y-4">
                                <h4 className="pb-1 border-b font-semibold text-gray-500 text-xs uppercase tracking-wider">Academic</h4>
                                <div className="gap-2 grid grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="text-gray-500 text-xs">Class</label>
                                        <Input name="class_grade" value={formData.class_grade} onChange={handleInputChange} className="h-8" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-gray-500 text-xs">Section</label>
                                        <Input name="section" value={formData.section} onChange={handleInputChange} className="h-8" />
                                    </div>
                                </div>
                                <div className="gap-2 grid grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="text-gray-500 text-xs">Wing</label>
                                        <Input name="wing" value={formData.wing} onChange={handleInputChange} className="h-8" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-gray-500 text-xs">ID (C/No)</label>
                                        <Input name="c_no" value={formData.c_no} onChange={handleInputChange} className="h-8" />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Info - Editable */}
                            <div className="space-y-4">
                                <h4 className="pb-1 border-b font-semibold text-gray-500 text-xs uppercase tracking-wider">Payment Info</h4>
                                <div className="space-y-2">
                                    <label className="text-gray-500 text-xs">bKash Number</label>
                                    <Input name="bkash_number" value={formData.bkash_number} onChange={handleInputChange} className="h-8" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-gray-500 text-xs">Transaction ID</label>
                                    <Input name="transaction_id" value={formData.transaction_id} onChange={handleInputChange} className="h-8 font-mono uppercase" />
                                </div>
                                <div className="gap-2 grid grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="text-gray-500 text-xs">Type</label>
                                        <select
                                            name="membership_type"
                                            value={formData.membership_type}
                                            onChange={handleInputChange}
                                            className="flex bg-transparent file:bg-transparent disabled:opacity-50 shadow-sm px-3 py-1 border border-input file:border-0 rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full h-8 file:font-medium placeholder:text-muted-foreground text-sm file:text-sm transition-colors disabled:cursor-not-allowed"
                                        >
                                            <option value="without-tshirt">Without T-Shirt</option>
                                            <option value="with-tshirt">With T-Shirt</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-gray-500 text-xs">Size</label>
                                        <select
                                            name="tshirt_size"
                                            value={formData.tshirt_size || ''}
                                            onChange={handleInputChange}
                                            className="flex bg-transparent file:bg-transparent disabled:opacity-50 shadow-sm px-3 py-1 border border-input file:border-0 rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full h-8 file:font-medium placeholder:text-muted-foreground text-sm file:text-sm transition-colors disabled:cursor-not-allowed"
                                        >
                                            <option value="">N/A</option>
                                            <option value="S">S</option>
                                            <option value="M">M</option>
                                            <option value="L">L</option>
                                            <option value="XL">XL</option>
                                            <option value="XXL">XXL</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Logistics / Admin Check - New Section */}
                            <div className="space-y-4">
                                <h4 className="pb-1 border-b font-semibold text-gray-500 text-xs uppercase tracking-wider">Logistics</h4>
                                <div className="gap-4 grid grid-cols-2">
                                    <div className="flex items-center space-x-2 p-3 border border-gray-200 dark:border-zinc-800 rounded-md">
                                        <input
                                            type="checkbox"
                                            id="id_card_given"
                                            checked={formData.id_card_given || false}
                                            onChange={(e) => handleCheckboxChange('id_card_given', e.target.checked)}
                                            className="rounded focus:ring-blue-500 w-4 h-4 text-blue-600"
                                        />
                                        <label htmlFor="id_card_given" className="peer-disabled:opacity-70 font-medium text-sm leading-none peer-disabled:cursor-not-allowed">
                                            ID Card Given
                                        </label>
                                    </div>

                                    <div className={`flex items-center space-x-2 border p-3 rounded-md ${formData.membership_type !== 'with-tshirt' ? 'opacity-50 cursor-not-allowed bg-gray-50 dark:bg-zinc-900' : 'border-gray-200 dark:border-zinc-800'}`}>
                                        <input
                                            type="checkbox"
                                            id="tshirt_given"
                                            checked={formData.tshirt_given || false}
                                            onChange={(e) => handleCheckboxChange('tshirt_given', e.target.checked)}
                                            disabled={formData.membership_type !== 'with-tshirt'}
                                            className="rounded focus:ring-blue-500 w-4 h-4 text-blue-600"
                                        />
                                        <label htmlFor="tshirt_given" className="peer-disabled:opacity-70 font-medium text-sm leading-none peer-disabled:cursor-not-allowed">
                                            T-Shirt Given
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Technical - Read Only / Uneditable */}
                            <div className="space-y-4">
                                <h4 className="pb-1 border-b font-semibold text-gray-500 text-xs uppercase tracking-wider">Technical (Read Only)</h4>
                                <div>
                                    <p className="bg-zinc-50 dark:bg-zinc-900 mt-1 p-2 border rounded font-mono text-gray-500 text-xs break-all">
                                        {formData.user_agent}
                                    </p>
                                    <div className="flex justify-between items-center mt-2 text-gray-400 text-xs">
                                        <span>IP: {formData.ip_address}</span>
                                        <span>Created: {new Date(formData.created_at).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>Cancel</Button>
                        <Button onClick={handleSave} disabled={isSaving}>
                            {isSaving ? <Loader2 className="mr-2 w-4 h-4 animate-spin" /> : <Save className="mr-2 w-4 h-4" />}
                            Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div >
    );
}

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