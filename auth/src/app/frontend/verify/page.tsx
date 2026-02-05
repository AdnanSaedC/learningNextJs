"use client"
import React, { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"

export default function verifyEmail() {
    const [token, setToken] = React.useState("")
    const [userVerified, setUserVerified] = useState(false)
    const [error, setError] = useState("")
    // this is to give email for forgot password
    const [email, setEmail] = useState("")

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]; //url == abc/token?=xyz -> [abc/token,xyz] -> we are extracting the xyz
        setToken(urlToken)
    }, [])

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail()
        }
    }, [token])

    const verifyUserEmail = async () => {
        try {
            // here token is send as token obj in request.body
            const response = await axios.post("/api/users/verifyemail", { token })
            console.log(response.data)
            setUserVerified(true)
            setEmail(response.data.email)
        } catch (error: any) {
            console.log(error.response)
            setError(error)
        }
    }

    return (
        <div>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1>Verify Email</h1>
                <h2 className="p-2 bg-orange-500 text-black">{token ? token : "No Token"}</h2>
                {
                    userVerified && (
                        <div>
                            <h2 className="text-2xl">Verified</h2>
                            <Link href="/frontend/login">Login</Link>
                            <Link href={`/frontend/reset?email=${email}`}>Reset Password</Link>
                        </div>
                    )
                }
                {
                    error && (
                        <div>
                            <h2 className="text-2xl">Error</h2>
                        </div>
                    )
                }
            </div>
        </div>
    )
}