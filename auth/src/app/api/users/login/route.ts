import { connectToTheDatabase } from "@/src/app/dbConfig/dbConfig";
import User from "@/src/models/userModel.js";
import bcrypt from "bcryptjs";
import bcryptjs from "bcryptjs";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connectToTheDatabase();

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json()
        const { email, password } = reqBody

        if (!email || !password) {
            return NextResponse.json({ error: "Please enter all the values" }, { status: 400 })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({ error: "user was not found" }, { status: 400 })
        }

        // check whether password is correct or not
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({ error: "user was not found" }, { status: 400 })
        }

        // now let craete jwt token for the next request
        // in order to craete jwt you have to pass an object
        const tokenData = {
            id: user._id
        }
        // the exclamation mark is tell ts that it will come dont worry
        const jwtToken = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })

        user.verifyToken = jwtToken
        user.verifyTokenExpiry = Date.now() + 24 * 60 * 60 * 1000;
        await user.save()
        const responce = NextResponse.json({ message: "login Successfully" }, { status: 200 })

        responce.cookies.set("token", jwtToken, {
            httpOnly: true,
            path: "/" //this means it will be available on all routes
        })

        return responce

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ error: "Failed to login the user" }, { status: 400 })
    }
}