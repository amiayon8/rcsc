import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const commonEmailRegex =
    /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com)$/;

const bdPhoneRegex =
    /^(?:\+8801|01)[3-9]\d{8}$/;

export const registrationSchema = z.object({
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

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const validatedData = registrationSchema.parse(body);

        await new Promise((res) => setTimeout(res, 800));

        return NextResponse.json(
            {
                success: true,
                message: "Registration successful",
                data: validatedData,
            },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    success: false,
                    errors: error.flatten().fieldErrors,
                },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                message: "Internal server error",
            },
            { status: 500 }
        );
    }
}
