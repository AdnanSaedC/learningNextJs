"use client"
import { useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"

export default function resetPassword() {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    const resetPassword = async () => {
        const email = window.location.search.split("=")[1];
        if (password !== confirmPassword) {
            setError("Passwords do not match")
        }
        try {
            const response = await axios.post("/api/users/reset", { password, confirmPassword, email })
            console.log(response)
            setSuccess(true)
        } catch (error: any) {
            console.log(error.response)
            setError(error)
        }
    }
    return (
        <div>
            <h1>Reset Password</h1>
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <label>Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
            <button onClick={resetPassword}>Reset Password</button>
        </div>
    )
}