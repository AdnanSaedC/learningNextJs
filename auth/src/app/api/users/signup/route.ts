// import { connection } from "../../../dbConfig/dbConfig";
// normal way but here in next we use @ just a stanadrd and its map in ts.config file

// so the we have craeted te file structure in the same way the url will come
// here api/user/signup
// in the signup folder we have craeted this route.js file to handle all type of request 
import { connectToTheDatabase } from "@/src/app/dbConfig/dbConfig";
import User from "@/src/models/userModel.js";
import bcryptjs from "bcryptjs";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        // this is like req.body and req.params here
        const reqBody = await request.json()
        const { email, username, password } = reqBody

        console.log(reqBody)
        if (!email || !username || !password) {
            return NextResponse.json({ error: "Please provide all the fields" }, { status: 400 })
        }

        // let check for the existing user
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            console.log("User already exists")
            return NextResponse.json({ error: "User already exits" }, { status: 400 })
        }

        const salt = await bcryptjs.genSalt(10)
        // it will genearte a random string and will add it to the password
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = await User.create({
            email,
            username,
            password: hashedPassword
        })

        // when you console log all the field which dont have value for a particular obj or user is grouped as labelled as -v
        console.log(newUser)

        return NextResponse.json(
            {
                message: "User created successfully",
                success: true,
                user: newUser
            },
            { status: 201 }
        )

    } catch (error: any) {
        // in nextjs you have to send response in this format first body or dat then options like status code
        return NextResponse.json({ error: error.message, custom: "failed to craete user" }, { status: 500 })
    }
}


connectToTheDatabase()