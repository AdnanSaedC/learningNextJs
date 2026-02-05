import { NextRequest, NextResponse } from "next/server";
import User from "@/src/models/userModel";
import { connectToTheDatabase } from "@/src/app/dbConfig/dbConfig";

connectToTheDatabase()

export async function POST(request: NextRequest) {
    try {
        console.log("jhjjjj")
        const reqBody = await request.json()
        const { token } = reqBody
        console.log("hello", token)

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } }) || await User.findOne({ forgotPasswordToken: token, forgotPasswordTokenExpiry: { $gt: Date.now() } })
        console.log(user)
        if (!user) {
            return NextResponse.json({ message: "user does not exist ot time exceeded" })
        }

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        await user.save()
        return NextResponse.json({ message: "verified successfully", email: user.email }, { status: 200 })

    } catch (error: any) {
        throw new Error("failed to verfify email")
    }
}