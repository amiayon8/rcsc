import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const commonEmailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com)$/;
const bdPhoneRegex = /^(?:\+8801|01)[3-9]\d{8}$/;

const formatContactNumber = (num: string | undefined | null) => {
    if (!num) return "";

    let cleaned = num.replace(/[\s-]/g, '');

    if (cleaned.startsWith('+8801')) {
        return cleaned.replace('+88', '');
    }
    if (cleaned.startsWith('8801')) {
        return cleaned.substring(2);
    }

    return cleaned;
};

const serverMemberSchema = z.object({
    fullName: z
        .string()
        .min(3, "Full name is too short")
        .max(60, "Full name is too long"),

    class: z
        .string()
        .min(1, "Class is required")
        .pipe(z.enum(["VI", "VII", "VIII", "IX", "X", "XI"])),

    section: z
        .string()
        .min(1, "Section is required")
        .pipe(z.enum(["A", "B", "C", "D", "E", "B. Std"])),

    cNo: z
        .string()
        .regex(/^\d{4,10}$/, "Invalid College number"),

    wing: z
        .string()
        .min(1, "Wing is required")
        .pipe(z.enum(["EMMS", "BMMS", "EMDS", "BMDS"])),

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

    tshirtSize: z
        .enum(["M", "L", "XL", "XXL"])
        .optional()
        .or(z.literal("")),

    bkashNumber: z
        .string()
        .regex(bdPhoneRegex, "Invalid bKash number"),

    transactionId: z
        .string()
        .min(5, "Transaction ID is too short")
        .max(10, "Transaction ID is too long")
        .toUpperCase(),
    browserTime: z.string().optional(),

}).superRefine((data, ctx) => {
    if (data.membershipType === "with-tshirt" && !data.tshirtSize) {
        ctx.addIssue({
            path: ["tshirtSize"],
            code: z.ZodIssueCode.custom,
            message: "T-Shirt size is required for this membership"
        });
    }
});



export async function POST(req: NextRequest) {
    try {
        const origin = req.headers.get('origin');
        const referer = req.headers.get('referer');

        const allowedOrigins = [
            'http://localhost:3000',
            'https://rcscbd.org',
            'https://www.rcscbd.org'
        ];
        const isAllowed =
            (origin && allowedOrigins.includes(origin)) ||
            (referer && allowedOrigins.some(url => referer.startsWith(url)));

        if (!isAllowed) {
            return NextResponse.json(
                { message: "Unauthorized source" },
                { status: 403 }
            );
        }

        const secretHeader = req.headers.get('x-source-platform');
        if (secretHeader !== 'web-registration-form') {
            return NextResponse.json(
                { message: "Invalid platform" },
                { status: 403 }
            );
        }

        const body = await req.json();

        const result = serverMemberSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { message: "Validation failed", errors: result.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const data = result.data;

        const userAgent = req.headers.get("user-agent") || "Unknown";

        let ip = req.headers.get("x-forwarded-for");

        if (ip) {
            ip = ip.split(',')[0].trim();
        } else {
            ip = "Unknown";
        }

        const cleanedPhone = formatContactNumber(data.phone);
        const cleanedWhatsapp = formatContactNumber(data.whatsapp);
        const cleanedBkash = formatContactNumber(data.bkashNumber);

        const { error } = await supabase.from("registrations").insert({
            full_name: data.fullName,
            class_grade: data.class,
            section: data.section,
            c_no: data.cNo,
            wing: data.wing,
            email: data.email,
            phone: cleanedPhone,
            whatsapp: cleanedWhatsapp,
            membership_type: data.membershipType,
            tshirt_size: data.tshirtSize || null,
            bkash_number: cleanedBkash,
            transaction_id: data.transactionId,
            browser_time: data.browserTime,
            user_agent: userAgent,
            ip_address: ip,
            is_validated: false,
        });

        if (error) {
            if (error.code === "23505") {
                return NextResponse.json({ message: "This Transaction ID has already been used." }, { status: 409 });
            }
            return NextResponse.json({ message: "Database error" }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: "Registration successful" });

    } catch (err) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}