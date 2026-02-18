'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { z } from "zod";
import { Send, FileText, Hash, CheckCircle, Check, Copy } from "lucide-react";
import { toast } from 'sonner';

const commonEmailRegex =
    /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com)$/;

const bdPhoneRegex =
    /^(?:\+8801|01)[3-9]\d{8}$/;

export const memberSchema = z.object({
    fullName: z
        .string()
        .min(3, "Full name must be at least 3 characters")
        .max(60, "Full name is too long"),

    class: z.enum(["VI", "VII", "VIII", "IX", "X", "XI"])
        .refine(Boolean, { message: "Class is required" }),

    section: z.enum(["A", "B", "C", "D", "E", "B. Std"]),

    cNo: z
        .string()
        .regex(/^\d{4,10}$/, "Invalid College number"),

    wing: z.enum(["EMMS", "BMMS", "EMDS", "BMDS"])
        .refine(Boolean, { message: "Wing is required" }),

    email: z
        .string()
        .email("Invalid email format")
        .regex(commonEmailRegex, "Invalid Email"),

    phone: z
        .string()
        .regex(bdPhoneRegex, "Invalid phone number"),
    whatsapp: z
        .string()
        .regex(bdPhoneRegex, "Invalid phone number"),

    membershipType: z.enum(["with-tshirt", "without-tshirt"])
        .refine(v => v !== undefined, {
            message: "Please select a membership type"
        }),

    tshirtSize: z.enum(["S", "M", "L", "XL", "XXL"]).optional(),

    bkashNumber: z
        .string()
        .regex(bdPhoneRegex, "Invalid bKash number (e.g., 01xxxxxxxxx)"),

    transactionId: z
        .string()
        .min(5, "Transaction ID is too short")
        .toUpperCase(),

}).refine((data) => {
    if (data.membershipType === "with-tshirt" && !data.tshirtSize) {
        return false;
    }
    return true;
}, {
    message: "T-Shirt size is required for this membership",
    path: ["tshirtSize"],
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
    whatsapp: string;
    membershipType: string;
    tshirtSize: string;
    bkashNumber: string;
    transactionId: string;
}

export default function RegistrationPage() {

    const [copied, setCopied] = useState(false);
    const phoneNumber = "01715012619";

    const [formData, setFormData] = useState<MemberFormData>({
        fullName: '',
        class: '',
        section: '',
        cNo: '',
        wing: '',
        email: '',
        phone: '',
        whatsapp: '',
        membershipType: 'without-tshirt',
        tshirtSize: '',
        bkashNumber: '',
        transactionId: '',
    });

    const paymentAmount = formData.membershipType === 'with-tshirt' ? "250" : "150";

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<MemberFormKeys, string>>>({});
    const [sameAsPhone, setSameAsPhone] = useState(false);

    // --- NEW HELPER FUNCTION FOR STYLING ---
    const getInputClasses = (fieldName: MemberFormKeys) => {
        const hasError = !!errors[fieldName];
        // Common base styles
        const base = "px-4 py-3 border rounded-lg focus:outline-none w-full text-white transition-all placeholder-gray-500";

        if (hasError) {
            // RED RING styles (Active when error exists)
            return `${base} border-red-500 ring-2 ring-red-500 bg-red-500/10`;
        }

        // Normal styles
        return `${base} border-white/10 focus:border-primary focus:ring-1 focus:ring-primary bg-[#0f1932]/80`;
    };
    // ---------------------------------------

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const finalValue = name === 'transactionId' ? value.toUpperCase() : value;

        setFormData((prev) => {
            const updates = { ...prev, [name]: finalValue };

            if (name === 'phone' && sameAsPhone) {
                updates.whatsapp = finalValue;
            }

            return updates;
        });

        if (name === 'whatsapp' && sameAsPhone) {
            setSameAsPhone(false);
        }

        // Clear error when user starts typing
        if (errors[name as MemberFormKeys]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSameAsPhone = (e: ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setSameAsPhone(isChecked);

        if (isChecked) {
            setFormData(prev => ({ ...prev, whatsapp: prev.phone }));
            setErrors(prev => ({ ...prev, whatsapp: undefined }));
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(phoneNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const steps = [
        {
            id: "01",
            title: "Send Payment",
            description: (
                <span>
                    Send <span className="font-semibold text-white">BDT {paymentAmount}</span> via bKash (Send Money) to{' '}
                    <span
                        onClick={handleCopy}
                        className="bg-pink-100 hover:bg-pink-200 px-1 rounded font-mono text-pink-700 transition cursor-pointer"
                        title="Click to copy"
                    >
                        {phoneNumber}
                    </span>
                </span>
            ),
            icon: <Send className="w-5 h-5 text-white" />,
            color: "bg-pink-500",
            status: "Payment Required"
        },
        {
            id: "02",
            title: "Fill Registration Form",
            description: "Complete the Membership Registration Form carefully with accurate information.",
            icon: <FileText className="w-5 h-5 text-white" />,
            color: "bg-blue-500",
            status: "Action Needed"
        },
        {
            id: "03",
            title: "Submit Transaction ID",
            description: "Enter the bKash Number & Transaction ID in the form below.",
            icon: <Hash className="w-5 h-5 text-white" />,
            color: "bg-indigo-500",
            status: "Verification"
        },
        {
            id: "Final",
            title: "Wait for Confirmation",
            description: "Please wait for verification. Once confirmed, you will be added to the official WhatsApp group.",
            icon: <CheckCircle className="w-5 h-5 text-white" />,
            color: "bg-green-500",
            status: "Complete"
        }
    ];

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        const dataToValidate = { ...formData };
        if (dataToValidate.membershipType === 'without-tshirt') {
            dataToValidate.tshirtSize = undefined as any;
        }

        const result = memberSchema.safeParse(dataToValidate);

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            const formattedErrors: Partial<Record<MemberFormKeys, string>> = {};

            (Object.keys(fieldErrors) as MemberFormKeys[]).forEach((key) => {
                const message = fieldErrors[key]?.[0];
                if (message) formattedErrors[key] = message;
            });

            setErrors(formattedErrors);
            setIsSubmitting(false);
            return;
        }

        try {
            const submissionData = {
                ...result.data,
                browserTime: new Date().toString()
            };

            const res = await fetch("/registration/api", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-source-platform": "web-registration-form",
                },
                body: JSON.stringify(submissionData),
            });

            const data = await res.json();

            if (!res.ok) {
                if (data?.errors) {
                    const serverErrors: Partial<Record<MemberFormKeys, string>> = {};
                    (Object.keys(data.errors) as MemberFormKeys[]).forEach((key) => {
                        const message = data.errors[key]?.[0];
                        if (message) serverErrors[key] = message;
                    });
                    setErrors(serverErrors);
                    return;
                }
                throw new Error(data?.message || "Submission failed");
            }

            setSubmitted(true);
        } catch (err) {
            toast.error("Registration failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center bg-[#0b1121] p-4 pt-30 pb-10 w-full min-h-screen text-slate-200">

            <div className="top-[-10%] left-[-10%] z-0 fixed bg-cyan-500/10 blur-[100px] rounded-full w-125 h-125" />
            <div className="right-[-10%] bottom-[-10%] z-0 fixed bg-blue-600/10 blur-[100px] rounded-full w-125 h-125" />

            <div className="z-10 relative w-full max-w-7xl">

                <div className="mb-16 text-center animate-[slideUp_0.8s_ease_forwards]">
                    <h1 className="drop-shadow-[0_0_15px_rgba(0,210,255,0.6)] font-black text-[clamp(2rem,5vw,3.5rem)] text-white text-center uppercase tracking-tighter">
                        Join <span className="text-primary">RCSC</span>
                    </h1>
                    <p className="text-[#8899ac] text-xl text-center">
                        Member Registration
                    </p>
                </div>

                <div className="gap-6 grid grid-cols-1 lg:grid-cols-2 w-full">
                    <div className="bg-white/5 shadow-2xl backdrop-blur-xl p-8 border border-white/10 rounded-3xl w-full h-fit">

                        {!submitted ? (
                            <form onSubmit={handleSubmit} className="z-50 relative space-y-6">

                                <div className="space-y-6">
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
                                            placeholder="Ayon Sarker"
                                            className={getInputClasses('fullName')}
                                        />
                                        {errors.fullName && <p className="text-destructive text-sm">{errors.fullName}</p>}
                                    </div>

                                    <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                                        <div>
                                            <label className="block mb-2 font-semibold text-primary/80 text-sm uppercase tracking-wider">Class</label>
                                            <select
                                                name="class"
                                                required
                                                value={formData.class}
                                                onChange={handleChange}
                                                className={getInputClasses('class')}
                                            >
                                                <option value="" disabled>Select Class</option>
                                                <option value="VI">Class VI</option>
                                                <option value="VII">Class VII</option>
                                                <option value="VIII">Class VIII</option>
                                                <option value="IX">Class IX</option>
                                                <option value="X">Class X</option>
                                                <option value="XI">Class XI</option>
                                            </select>
                                            {errors.class && <p className="text-destructive text-sm">{errors.class}</p>}
                                        </div>

                                        <div>
                                            <label className="block mb-2 font-semibold text-primary/80 text-sm uppercase tracking-wider">Section</label>
                                            <select
                                                name="section"
                                                required
                                                value={formData.section}
                                                onChange={handleChange}
                                                className={getInputClasses('section')}
                                            >
                                                <option value="" disabled>Select Section</option>
                                                <option value="A">A</option>
                                                <option value="B">B</option>
                                                <option value="C">C</option>
                                                <option value="D">D</option>
                                                <option value="E">E</option>
                                                <option value="B. Std">B. Std</option>
                                            </select>
                                            {errors.section && <p className="text-destructive text-sm">{errors.section}</p>}
                                        </div>
                                    </div>

                                    <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                                        <div>
                                            <label className="block mb-2 font-semibold text-primary/80 text-sm uppercase tracking-wider">C/No (ID)</label>
                                            <input
                                                type="text"
                                                name="cNo"
                                                required
                                                value={formData.cNo}
                                                onChange={handleChange}
                                                placeholder="1234"
                                                className={getInputClasses('cNo')}
                                            />
                                            {errors.cNo && <p className="text-destructive text-sm">{errors.cNo}</p>}
                                        </div>
                                        <div>
                                            <label className="block mb-2 font-semibold text-primary/80 text-sm uppercase tracking-wider">Wing</label>
                                            <select
                                                name="wing"
                                                required
                                                value={formData.wing}
                                                onChange={handleChange}
                                                className={getInputClasses('wing')}
                                            >
                                                <option value="" disabled>Select Wing</option>
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
                                            <label className="block mb-2 font-semibold text-primary/80 text-sm uppercase tracking-wider">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="xxxxxx@gmail.com"
                                                className={getInputClasses('email')}
                                            />
                                            {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
                                        </div>
                                        <div>
                                            <label className="block mb-2 font-semibold text-primary/80 text-sm uppercase tracking-wider">Phone No.</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="01xxxxxxxxx"
                                                className={getInputClasses('phone')}
                                            />
                                            {errors.phone && <p className="text-destructive text-sm">{errors.phone}</p>}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="font-semibold text-primary/80 text-sm uppercase tracking-wider">
                                                WhatsApp No.
                                            </label>

                                            <label className="group flex items-center gap-2 cursor-pointer select-none">
                                                <input
                                                    type="checkbox"
                                                    checked={sameAsPhone}
                                                    onChange={handleSameAsPhone}
                                                    className="bg-white/5 border-white/20 rounded focus:ring-cyan-500 w-4 h-4 text-cyan-500 accent-cyan-500"
                                                />
                                                <span className="text-gray-400 group-hover:text-white text-xs uppercase tracking-wider transition-colors">
                                                    Same as Phone
                                                </span>
                                            </label>
                                        </div>

                                        <input
                                            type="tel"
                                            name="whatsapp"
                                            required
                                            value={formData.whatsapp}
                                            onChange={handleChange}
                                            placeholder="01xxxxxxxxx"
                                            className={getInputClasses('whatsapp')}
                                        />
                                        {errors.whatsapp && <p className="text-destructive text-sm">{errors.whatsapp}</p>}
                                    </div>

                                    <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                                        <div>
                                            <label className="block mb-2 font-semibold text-primary/80 text-sm uppercase tracking-wider">Membership Type</label>
                                            <select
                                                name="membershipType"
                                                required
                                                value={formData.membershipType}
                                                onChange={handleChange}
                                                className={getInputClasses('membershipType')}
                                            >
                                                <option value="without-tshirt">Without T-Shirt (150 BDT)</option>
                                                <option value="with-tshirt">With T-Shirt (250 BDT)</option>
                                            </select>
                                        </div>
                                        {formData.membershipType === 'with-tshirt' && (
                                            <div className="animate-fade-in">
                                                <label className="block mb-2 font-semibold text-primary/80 text-sm uppercase tracking-wider">T-Shirt Size</label>
                                                <select
                                                    name="tshirtSize"
                                                    required
                                                    value={formData.tshirtSize}
                                                    onChange={handleChange}
                                                    className={getInputClasses('tshirtSize')}
                                                >
                                                    <option value="" disabled>Select Size</option>
                                                    <option value="S">S</option>
                                                    <option value="M">M</option>
                                                    <option value="L">L</option>
                                                    <option value="XL">XL</option>
                                                    <option value="XXL">XXL</option>
                                                </select>
                                                {errors.tshirtSize && <p className="text-destructive text-sm">{errors.tshirtSize}</p>}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-white/5 p-6 border border-white/10 rounded-xl animate-fade-in">
                                    <h3 className="mb-4 font-bold text-primary text-lg uppercase tracking-wider">Payment Details</h3>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="block mb-2 font-semibold text-primary/80 text-sm uppercase tracking-wider">
                                                Sending bKash Number
                                            </label>
                                            <input
                                                type="tel"
                                                name="bkashNumber"
                                                required
                                                value={formData.bkashNumber}
                                                onChange={handleChange}
                                                placeholder="Number you sent money from (01xxxxxxxxx)"
                                                className={getInputClasses('bkashNumber')}
                                            />
                                            {errors.bkashNumber && <p className="text-destructive text-sm">{errors.bkashNumber}</p>}
                                        </div>

                                        <div>
                                            <label className="block mb-2 font-semibold text-primary/80 text-sm uppercase tracking-wider">
                                                Transaction ID (TrxID)
                                            </label>
                                            <div className="relative">
                                                <Hash className="top-1/2 left-3 absolute text-gray-400 -translate-y-1/2" size={18} />
                                                <input
                                                    type="text"
                                                    name="transactionId"
                                                    required
                                                    value={formData.transactionId}
                                                    onChange={handleChange}
                                                    placeholder="ABCDE12345"
                                                    className={`${getInputClasses('transactionId')} pl-10 font-mono uppercase`}
                                                />
                                            </div>
                                            {errors.transactionId && <p className="text-destructive text-sm">{errors.transactionId}</p>}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-primary disabled:opacity-50 shadow-lg hover:shadow-cyan-500/25 mt-4 py-4 rounded-lg w-full font-bold text-primary-foreground uppercase tracking-widest hover:scale-[1.02] transition-all cursor-pointer disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Verifying...' : `Confirm Payment & Register`}
                                </button>
                            </form>
                        ) : (
                            <div className="flex flex-col justify-center items-center py-10 text-center animate-fade-in-up">
                                <div className="flex justify-center items-center bg-green-500/20 shadow-[0_0_20px_rgba(74,222,128,0.3)] mb-4 border border-green-500/50 rounded-full w-20 h-20 text-green-400 text-4xl">
                                    ✓
                                </div>
                                <h3 className="font-bold text-white text-2xl">Registration Pending!</h3>
                                <p className="mt-2 text-gray-400">
                                    Thank you, {formData.fullName}.<br />
                                    We have received your TrxID: <span className="font-mono text-primary">{formData.transactionId}</span>.
                                </p>
                                <p className="mt-2 text-gray-500 text-sm">You will be added to the WhatsApp group after manual verification.</p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-8 text-primary hover:text-cyan-300 text-sm underline underline-offset-4"
                                >
                                    Register another member
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="bg-white/5 shadow-2xl backdrop-blur-xl p-8 border border-white/10 rounded-3xl w-full h-fit">
                        <h2 className="mb-8 font-bold text-white text-2xl">Registration Process</h2>

                        <div className="relative">
                            <div className="top-2 left-6 absolute bg-gray-800 w-0.5 h-[calc(100%-40px)]" aria-hidden="true"></div>

                            <ul className="space-y-10">
                                {steps.map((step, index) => (
                                    <li key={index} className="relative flex gap-6">
                                        <div
                                            className={`relative flex h-12 w-12 flex-none items-center justify-center rounded-full ${step.color} ring-8 ring-gray-900 z-10 shadow-lg shadow-black/30`}
                                        >
                                            {step.icon}
                                        </div>
                                        <div className="flex flex-col pt-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-semibold text-gray-400 text-xs uppercase tracking-wider">
                                                    Step {step.id}
                                                </span>
                                                {step.id === "01" && copied && (
                                                    <span className="flex items-center text-green-400 text-xs animate-fade-in">
                                                        <Check size={12} className="mr-1" /> Copied
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="font-bold text-gray-100 text-lg leading-tight">
                                                {step.title}
                                            </h3>
                                            <p className="mt-2 text-gray-300 text-base leading-relaxed">
                                                {step.description}
                                            </p>
                                            {step.id === "01" && (
                                                <button
                                                    onClick={handleCopy}
                                                    className="flex items-center gap-2 mt-3 w-fit text-gray-400 hover:text-white text-sm transition-colors"
                                                >
                                                    <Copy size={14} />
                                                    <span>Copy bKash Number</span>
                                                </button>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}