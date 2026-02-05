"use client"
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";




export default function forgotpassword() {
    const [email, setEmail] = React.useState("")
    const [error, setError] = React.useState("")

    const sendEmail = async () => {
        try {
            console.log("tried")
            const response = await axios.post("/api/users/forgotpassword", { email })
            console.log(response.data)
            toast.success("Password reset email sent!")



        } catch (error: any) {
            console.log(error.response)
            toast.error("Failed to send mail")
        }
    }

    return (
        <div>
            <h1>forgotpassword</h1>
            <div className="flex flex-col justify-center items-center">
                <label htmlFor="email">Email</label>
                <input
                    className="text-white"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={sendEmail}>Send Email</button>
            </div>
            <div>
                {error && <p>{email} does not exist</p>}
            </div>
        </div>

    )
}