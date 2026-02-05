import User from "@/src/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToTheDatabase } from "@/src/app/dbConfig/dbConfig";

connectToTheDatabase();

export async function POST(request: NextRequest) {
    try {
        const { password, confirmPassword, email } = await request.json();
        if (password !== confirmPassword) {
            return NextResponse.json({ error: "Passwords do not match" }, { status: 400 })
        }
        console.log(password, confirmPassword, email)
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        return NextResponse.json({ message: "Password reset successfully" }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}