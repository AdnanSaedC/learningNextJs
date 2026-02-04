import { connectToTheDatabase } from "@/src/app/dbConfig/dbConfig";
import { getDataFromToken } from "@/src/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/src/models/userModel"

connectToTheDatabase()

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);

        const user = await User.findOne({ _id: userId }).select("-password")


        return NextResponse.json({
            message: "User found",
            userData: user
        })
    } catch (error: any) {
        console.log("Error while getting the profile")
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}