import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = async (request: NextRequest) => {
    try {

        const token = request.cookies.get("token")?.value || " "

        const decodedToken: any = await jwt.verify(token, process.env.TOKEN_SECRET!)

        return decodedToken.id;

    } catch (error: any) {

        console.log(error.message)
        throw new Error("failed to get the data from token")

    }
}