import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const commonEmailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com)$/;
const bdPhoneRegex = /^(?:\+8801|01)[3-9]\d{8}$/;

const serverMemberSchema = z.object({
    fullName: z.string().min(3).max(60),
    class: z.enum(["VI", "VII", "VIII", "IX", "X", "XI"]),
    section: z.enum(["A", "B", "C", "D", "E", "B. Std"]),
    cNo: z.string().regex(/^\d{4,10}$/),
    wing: z.enum(["EMMS", "BMMS", "EMDS", "BMDS"]),
    email: z.string().email().regex(commonEmailRegex),
    phone: z.string().regex(bdPhoneRegex),
    whatsapp: z.string().regex(bdPhoneRegex),
    membershipType: z.enum(["with-tshirt", "without-tshirt"]),
    tshirtSize: z.enum(["S", "M", "L", "XL", "XXL"]).optional(),
    bkashNumber: z.string().regex(bdPhoneRegex),
    transactionId: z.string().min(5).toUpperCase(),
    browserTime: z.string().optional(),
}).refine((data) => {
    if (data.membershipType === "with-tshirt" && !data.tshirtSize) {
        return false;
    }
    return true;
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

        const { error } = await supabase.from("registrations").insert({
            full_name: data.fullName,
            class_grade: data.class,
            section: data.section,
            c_no: data.cNo,
            wing: data.wing,
            email: data.email,
            phone: data.phone,
            whatsapp: data.whatsapp,
            membership_type: data.membershipType,
            tshirt_size: data.tshirtSize || null,
            bkash_number: data.bkashNumber,
            transaction_id: data.transactionId,
            browser_time: data.browserTime,
            user_agent: userAgent,
            ip_address: ip,
            is_validated: false,
        });

        if (error) {
            console.error("Supabase Error:", error);
            if (error.code === "23505") {
                return NextResponse.json({ message: "This Transaction ID has already been used." }, { status: 409 });
            }
            return NextResponse.json({ message: "Database error" }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: "Registration successful" });

    } catch (err) {
        console.error("Server Error:", err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}