import { connectToTheDatabase } from "@/src/app/dbConfig/dbConfig";
import User from "@/src/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/src/helpers/nodeMailer";

connectToTheDatabase()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;

        // Find user by email
        console.log(email)
        const user = await User.findOne({ email });
        console.log(user)
        if (!user) {
            return NextResponse.json(
                { error: "User not found with this email" },
                { status: 404 }
            );
        }

        // Send password reset email
        await sendMail({
            email,
            emailType: "reset",
            userId: user._id
        });

        return NextResponse.json({
            message: "Password reset email sent successfully",
            success: true,
            email: email
        });

    } catch (error: any) {
        console.error("Forgot password error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to send password reset email" },
            { status: 500 }
        );
    }
}
