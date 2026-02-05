// read about.txt line 20 to understand what is this
/**
 * in next everything is bydefault treated as server component and if you want to make to design for the frontend you have to explicitly say / mention here
 * 
 * by using this your client side component will get access to client browser else not
 */
"use client"
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";



export default function SignupPage() {

  const router = useRouter()

  const [user, setUser] = React.useState({
    email: "",
    password: ""
  })

  const onLogin = async () => {
    try {
      const response = await axios.post("/api/users/login", user)
      console.log("login Successfull", response.data)
      toast.success("login Successfull")
      router.push("/frontend/profile")
    } catch (error: any) {
      console.log(error)
      const errorMessage = error.response?.data.error || error.message
      console.log(errorMessage)
      toast.error(errorMessage)
    }
  }

  return (

    <div className="min-h-screen flex flex-col justify-center items-center dark:bg-black">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md dark:bg-black">
        <h2 className="text-2xl font-bold mb-6 text-center">Login page</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
        }} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 p-2 rounded"
              value={user.email}
              // here we are spreading the user objectv and updating the emnail field
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 p-2 rounded"
              value={user.password}
              // here we are spreading the user objectv and updating the password field
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" onClick={onLogin}>
            Login
          </button>
          <Link href="/frontend/signup">SignUp</Link>
          <div className="flex justify-center">
            <Link href="/frontend/forgotpassword" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Forgot Password</Link>
          </div>
        </form>
      </div>
    </div>
  );
}