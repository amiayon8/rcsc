'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { Eye, EyeOff, Lock, Mail, Loader2, LogIn, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

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

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const job = async () => {
            if (await checkUser()) {
                router.push('/admin/dashboard');
            }
        }

        job();
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                throw error;
            }

            router.push('/admin/dashboard');
        } catch (err: any) {
            setError(err.message || 'Failed to sign in');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative flex justify-center items-center p-4 pt-28 w-full min-h-screen overflow-hidden">

            <div className="-top-[10%] -left-[10%] z-0 fixed bg-cyan-500/10 blur-[100px] rounded-full w-125 h-125" />
            <div className="-right-[10%] -bottom-[10%] z-0 fixed bg-blue-600/10 blur-[100px] rounded-full w-125 h-125" />

            <Card className="z-10 bg-white/5 dark:bg-black/40 backdrop-blur-xl border-white/10 w-full max-w-md">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="flex justify-center items-center bg-primary/10 rounded-full ring-8 ring-primary/5 w-12 h-12">
                            <LogIn className="w-6 h-6 text-primary" />
                        </div>
                    </div>
                    <CardTitle className="font-bold text-white text-2xl tracking-tight">
                        Admin Access
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                        Enter your credentials to access the dashboard
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="space-y-4">

                        {error && (
                            <Alert variant="destructive" className="bg-red-500/10 border-red-500/50 text-red-200">
                                <AlertCircle className="w-4 h-4" />
                                <AlertDescription>
                                    {error}
                                </AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-300">Email</Label>
                            <div className="relative">
                                <Mail className="top-3 left-3 absolute w-4 h-4 text-gray-500" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@rcsc.org"
                                    className="bg-black/20 pl-10 border-white/10 focus:border-primary focus:ring-primary text-white placeholder:text-gray-500"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-gray-300">Password</Label>
                            <div className="relative">
                                <Lock className="top-3 left-3 absolute w-4 h-4 text-gray-500" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    className="bg-black/20 pr-10 pl-10 border-white/10 focus:border-primary focus:ring-primary text-white placeholder:text-gray-500"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="top-3 right-3 absolute text-gray-500 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className='pt-8'>
                        <Button
                            type="submit"
                            className="bg-primary hover:bg-primary/90 w-full font-bold text-primary-foreground"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                                    Authenticating...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}