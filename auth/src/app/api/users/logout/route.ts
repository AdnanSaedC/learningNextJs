import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
            message: "logout successfully",
            success: true
        })

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0) //we are replacing our cookie and expiring at the same time
        })

        return response
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
