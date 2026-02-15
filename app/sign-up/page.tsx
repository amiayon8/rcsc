'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { Eye, EyeOff, Lock, Mail, Loader2, UserPlus, AlertCircle, Check, X } from 'lucide-react';

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

export default function SignUpPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [validations, setValidations] = useState({
        length: false,
        number: false,
        uppercase: false,
        special: false,
        match: false
    });

    useEffect(() => {
        const job = async () => {
            if (await checkUser()) {
                router.push('/admin/dashboard');
            }
        }

        job();
    }, []);

    useEffect(() => {
        setValidations({
            length: password.length >= 8,
            number: /\d/.test(password),
            uppercase: /[A-Z]/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
            match: password !== '' && password === confirmPassword
        });
    }, [password, confirmPassword]);

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!Object.values(validations).every(Boolean)) {
            setError("Please meet all password requirements.");
            return;
        }

        setIsLoading(true);

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) throw error;

            setSuccess("Account created!");

        } catch (err: any) {
            setError(err.message || 'Failed to sign up');
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
                            <UserPlus className="w-6 h-6 text-primary" />
                        </div>
                    </div>
                    <CardTitle className="font-bold text-white text-2xl tracking-tight">
                        Create Account
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                        Register for a new admin account
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSignUp}>
                    <CardContent className="space-y-4">

                        {error && (
                            <Alert variant="destructive" className="bg-red-500/10 border-red-500/50 text-red-200">
                                <AlertCircle className="w-4 h-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {success && (
                            <Alert className="bg-green-500/10 border-green-500/50 text-green-200">
                                <Check className="w-4 h-4" />
                                <AlertDescription>{success}</AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-300">Email</Label>
                            <div className="relative">
                                <Mail className="top-3 left-3 absolute w-4 h-4 text-gray-500" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@rcscbd.org"
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
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-gray-300">Confirm Password</Label>
                            <div className="relative">
                                <Lock className="top-3 left-3 absolute w-4 h-4 text-gray-500" />
                                <Input
                                    id="confirmPassword"
                                    type={showPassword ? "text" : "password"}
                                    className="bg-black/20 pl-10 border-white/10 focus:border-primary focus:ring-primary text-white placeholder:text-gray-500"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="bg-black/20 p-3 rounded-lg text-xs">
                            <p className="mb-2 font-semibold text-gray-400 uppercase tracking-wider">Password Requirements</p>
                            <ul className="space-y-1">
                                <RequirementItem isValid={validations.length} text="At least 8 characters" />
                                <RequirementItem isValid={validations.uppercase} text="One uppercase letter (A-Z)" />
                                <RequirementItem isValid={validations.number} text="One number (0-9)" />
                                <RequirementItem isValid={validations.special} text="One special character (!@#...)" />
                                <RequirementItem isValid={validations.match} text="Passwords match" />
                            </ul>
                        </div>

                    </CardContent>
                    <CardFooter className="flex-col pt-4">
                        <Button
                            type="submit"
                            className="bg-primary hover:bg-primary/90 w-full font-bold text-primary-foreground"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                                    Creating Account...
                                </>
                            ) : (
                                "Sign Up"
                            )}
                        </Button>
                        <div className="mt-4 text-sm text-center">
                            <span className="text-gray-400">Already have an account? </span>
                            <button
                                type="button"
                                onClick={() => router.push('/login')}
                                className="font-semibold text-primary hover:text-primary/80 hover:underline"
                            >
                                Sign In
                            </button>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}

function RequirementItem({ isValid, text }: { isValid: boolean; text: string }) {
    return (
        <li className={`flex items-center gap-2 transition-colors duration-300 ${isValid ? 'text-green-400' : 'text-gray-500'}`}>
            {isValid ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
            <span>{text}</span>
        </li>
    );
}