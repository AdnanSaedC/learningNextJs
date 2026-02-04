"use client"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useState } from "react"
import Link from "next/link"

export default function ProfilePage() {
    const [userId, setUserId] = useState("Nothing")
    const router = useRouter()

    const logout = async () => {
        try {
            await axios.get("/api/users/logout")
            toast.success("Logout successfully")
            router.push("/")
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || error.message
            toast.error(errorMessage)
            console.log("error: ", error)
        }
    }

    const getUserInfo = async () => {
        const response = await axios.get("/api/users/userdata")
        setUserId(response.data.userData._id)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <button onClick={logout} className="bg-red-500">Logout</button>
            <button onClick={getUserInfo}
            >
                {
                    userId === "Nothing" ? "nothing" : <Link href={`/frontend/profile/${userId}`}>
                        {userId}
                    </Link>
                }
            </button>
        </div>
    )
}