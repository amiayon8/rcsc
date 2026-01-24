'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { z } from "zod";

const commonEmailRegex =
    /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com)$/;

const bdPhoneRegex =
    /^(?:\+8801|01)[3-9]\d{8}$/;

export const memberSchema = z.object({
    fullName: z
        .string()
        .min(3, "Full name must be at least 3 characters")
        .max(60, "Full name is too long"),

    class: z.enum(["VI", "VII", "VIII", "IX", "X", "XI", "XII"])
        .refine(Boolean, { message: "Class is required" }),

    section: z
        .string()
        .min(1, "Section is required"),

    cNo: z
        .string()
        .regex(/^\d{4,10}$/, "Invalid College number"),

    wing: z.enum(["EMMS", "BMMS", "EMDS", "BMDS"])
        .refine(Boolean, { message: "Wing is required" }),

    email: z
        .string()
        .email("Invalid email format")
        .regex(commonEmailRegex, "Only Gmail, Yahoo, Outlook or Hotmail allowed"),

    phone: z
        .string()
        .regex(bdPhoneRegex, "Invalid Bangladeshi phone number"),
});

type MemberFormKeys = keyof MemberFormData;

interface MemberFormData {
    fullName: string;
    class: string;
    section: string;
    cNo: string;
    wing: string;
    email: string;
    phone: string;
}

export default function RegistrationPage() {
    const [formData, setFormData] = useState<MemberFormData>({
        fullName: '',
        class: '',
        section: '',
        cNo: '',
        wing: '',
        email: '',
        phone: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<MemberFormKeys, string>>>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});
        const result = memberSchema.safeParse(formData);

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            const formattedErrors: Partial<Record<MemberFormKeys, string>> = {};

            (Object.keys(fieldErrors) as MemberFormKeys[]).forEach((key) => {
                const message = fieldErrors[key]?.[0];
                if (message) {
                    formattedErrors[key] = message;
                }
            });

            setErrors(formattedErrors);
            setIsSubmitting(false);
            return;
        }

        try {
            const res = await fetch("/registration/api", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(result.data),
            });

            const data = await res.json();

            if (!res.ok) {
                if (data?.errors) {
                    const serverErrors: Partial<Record<MemberFormKeys, string>> = {};

                    (Object.keys(data.errors) as MemberFormKeys[]).forEach((key) => {
                        const message = data.errors[key]?.[0];
                        if (message) {
                            serverErrors[key] = message;
                        }
                    });

                    setErrors(serverErrors);
                    return;
                }

                throw new Error(data?.message || "Submission failed");
            }

            console.log("Validated Submission:", data.data);
            setSubmitted(true);
        } catch (err) {
            console.error("Registration error:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center bg-[#0b1121] p-4 pt-30 pb-10 w-full min-h-screen text-slate-200">

            <div className="top-[-10%] left-[-10%] z-0 fixed bg-cyan-500/10 blur-[100px] rounded-full w-125 h-125" />
            <div className="right-[-10%] bottom-[-10%] z-0 fixed bg-blue-600/10 blur-[100px] rounded-full w-125 h-125" />

            <div className="z-10 relative w-full max-w-7xl">

                <div className="mb-8 text-center">
                    <h1 className="drop-shadow-[0_0_15px_rgba(0,210,255,0.3)] font-black text-white text-3xl md:text-5xl uppercase tracking-tight">
                        Join <span className="text-primary">RCSC</span>
                    </h1>
                    <p className="mt-2 text-[#8899ac]">Member Registration</p>
                </div>
                <div className="gap-6 grid grid-cols-1 lg:grid-cols-2 w-full">
                    <div className="bg-white/5 shadow-2xl backdrop-blur-xl p-8 border border-white/10 rounded-3xl w-full">

                        {!submitted ? (
                            <form onSubmit={handleSubmit} className="z-50 relative space-y-6">

                                <div className="group">
                                    <label className="block mb-2 font-semibold text-primary/80 text-sm uppercase tracking-wider">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        required
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="e.g. Ayon Sarker"
                                        className={`px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 w-full text-white transition-all placeholder-gray-500 ${errors.fullName ? 'border-destructive ring-1 ring-destructive bg-destructive/20' : 'border-white/10 focus:border-primary focus:ring-primary bg-[#0f1932]/80'}`}
                                    />
                                    {errors.fullName && <p className="text-destructive text-sm">{errors.fullName}</p>}
                                </div>

                                <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                                    <div>
                                        <label className="block mb-2 font-semibold text-primary/80 text-sm uppercase tracking-wider">
                                            Class
                                        </label>
                                        <select
                                            name="class"
                                            required
                                            value={formData.class}
                                            onChange={handleChange}
                                            className={`px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 w-full text-white bg-[#0f1932]/80 ${errors.class
                                                ? 'border-destructive ring-1 ring-destructive'
                                                : 'border-white/10 focus:border-primary focus:ring-primary'
                                                }`}
                                        >
                                            <option value="" disabled>
                                                Select Class
                                            </option>
                                            <option value="VI">Class VI</option>
                                            <option value="VII">Class VII</option>
                                            <option value="VIII">Class VIII</option>
                                            <option value="IX">Class IX</option>
                                            <option value="X">Class X</option>
                                            <option value="XI">Class XI</option>
                                            <option value="XII">Class XII</option>
                                        </select>
                                        {errors.class && <p className="text-destructive text-sm">{errors.class}</p>}
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-semibold text-primary/80 text-sm uppercase tracking-wider">
                                            Section
                                        </label>
                                        <input
                                            type="text"
                                            name="section"
                                            required
                                            value={formData.section}
                                            onChange={handleChange}
                                            placeholder="e.g. Science-A"
                                            className={`px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 w-full text-white transition-all placeholder-gray-500 ${errors.section ? 'border-destructive ring-1 ring-destructive bg-destructive/20' : 'border-white/10 focus:border-primary focus:ring-primary bg-[#0f1932]/80'}`}
                                        />
                                        {errors.section && <p className="text-destructive text-sm">{errors.section}</p>}
                                    </div>
                                </div>

                                <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                                    <div>
                                        <label className="block mb-2 font-semibold text-primary/80 text-sm uppercase tracking-wider">
                                            C/No (ID)
                                        </label>
                                        <input
                                            type="text"
                                            name="cNo"
                                            required
                                            value={formData.cNo}
                                            onChange={handleChange}
                                            placeholder="1234567890"
                                            className={`px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 w-full text-white transition-all placeholder-gray-500 ${errors.cNo ? 'border-destructive ring-1 ring-destructive bg-destructive/20' : 'border-white/10 focus:border-primary focus:ring-primary bg-[#0f1932]/80'}`}
                                        />
                                        {errors.cNo && <p className="text-destructive text-sm">{errors.cNo}</p>}
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-semibold text-primary/80 text-sm uppercase tracking-wider">
                                            Wing
                                        </label>
                                        <select
                                            name="wing"
                                            required
                                            defaultValue={formData.wing}
                                            onChange={handleChange}
                                            className={`px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 w-full text-white transition-all placeholder-gray-500 bg-[#0f1932]/80 ${errors.wing ? 'border-destructive ring-1 ring-destructive' : 'border-white/10 focus:border-primary focus:ring-primar'}`}
                                        >
                                            <option value="" disabled>
                                                Select Wing
                                            </option>
                                            <option value="EMMS">EMMS</option>
                                            <option value="BMMS">BMMS</option>
                                            <option value="EMDS">EMDS</option>
                                            <option value="BMDS">BMDS</option>
                                        </select>
                                        {errors.wing && <p className="text-destructive text-sm">{errors.wing}</p>}
                                    </div>
                                </div>

                                <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                                    <div>
                                        <label className="block mb-2 font-semibold text-primary/80 text-sm uppercase tracking-wider">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="xxxxxx@gmail.com"
                                            className={`px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 w-full text-white transition-all placeholder-gray-500 ${errors.email ? 'border-destructive ring-1 ring-destructive bg-destructive/20' : 'border-white/10 focus:border-primary focus:ring-primary bg-[#0f1932]/80'}`}
                                        />
                                        {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-semibold text-primary/80 text-sm uppercase tracking-wider">
                                            Phone No.
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="01xxxxxxxxx"
                                            className={`px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 w-full text-white transition-all placeholder-gray-500 ${errors.phone ? 'border-destructive ring-1 ring-destructive bg-destructive/20' : 'border-white/10 focus:border-primary focus:ring-primary bg-[#0f1932]/80'}`}
                                        />
                                        {errors.phone && <p className="text-destructive text-sm">{errors.phone}</p>}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-primary disabled:opacity-50 shadow-lg hover:shadow-cyan-500/25 mt-4 py-4 rounded-lg w-full font-bold text-primary-foreground uppercase tracking-widest hover:scale-[1.02] transition-all cursor-pointer disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Registering...' : 'Register Now'}
                                </button>
                            </form>
                        ) : (
                            <div className="flex flex-col justify-center items-center py-10 text-center animate-fade-in-up">
                                <div className="flex justify-center items-center bg-green-500/20 shadow-[0_0_20px_rgba(74,222,128,0.3)] mb-4 border border-green-500/50 rounded-full w-20 h-20 text-green-400 text-4xl">
                                    ✓
                                </div>
                                <h3 className="font-bold text-white text-2xl">Registration Complete!</h3>
                                <p className="mt-2 text-gray-400">Welcome to the team, {formData.fullName}.</p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-8 text-primary hover:text-cyan-300 text-sm underline underline-offset-4"
                                >
                                    Register another member
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="bg-white/5 shadow-2xl backdrop-blur-xl p-8 border border-white/10 rounded-3xl w-full">

                    </div>
                </div>
            </div>
        </div>
    );
}