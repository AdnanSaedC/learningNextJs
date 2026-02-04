// read about.txt line 20 to understand what is this
/**
 * in next everything is bydefault treated as server component and if you want to make to design for the frontend you have to explicitly say / mention here
 * 
 * by using this your client side component will get access to client browser else not
 * 
 * all the console.log message will be on the server if you dont implement this it will be on browser terminal a way to check whether its working or not
 */
"use client"
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";



export default function SignupPage() {

  const router = useRouter()
  // this will help us to redirect the user once he/she signs up to the home page

  const [user, setUser] = React.useState({
    email: "",
    username: "",
    password: ""
  })

  const [buttonEnable, setButtonEnable] = React.useState(false)

  // we want to allow to user to signup only when the they enter the values
  React.useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonEnable(true)
    }
    else {
      setButtonEnable(false)
    }
  }, [user])

  const onSignUp = async () => {
    try {
      const response = await axios.post("/api/users/signup", user)
      console.log("signup successfull", response.data)
      router.push("/")
    } catch (error: any) {
      console.log(error)
      const errorMessage = error.response?.data?.error || error.message
      console.log("signup failed: ", errorMessage)
      toast.error(errorMessage, {
        duration: 4000,
        position: 'top-center',
        icon: '❌'
      })
    }
  }

  return (

    <div className="min-h-screen flex flex-col justify-center items-center dark:bg-black">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md dark:bg-black">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
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
            <label className="block mb-1 font-medium">Username</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
              value={user.username}
              // here we are spreading the user objectv and updating the username field
              onChange={(e) => setUser({ ...user, username: e.target.value })}
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
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" onClick={onSignUp}>
            {
              buttonEnable ? "SignUp" : "Please enter all the fields"
            }
          </button>

          <div className="flex justify-center">
            <Link href="/frontend/login" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Login here</Link>
          </div>
        </form>
      </div>
    </div>
  );
}