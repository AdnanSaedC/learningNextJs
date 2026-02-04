import mongoose from "mongoose"
import { type } from "os";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required:[true,"Please enter a valid username: "],
        unique:true
    },
    email : {
        type : String,
        required:[true,"Please enter a valid email: "],
        unique:true
    },
    password : {
        type : String,
        required:[true,"Please enter a valid password: "],
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    // this is also used to track whether the user is guinenuine or not
    forgotPasswordToken : String,
    forgotPasswordTokenExpiry : Date,
    // verify is used to track the authenticity of the user
    verifyToken : String,
    verifyTokenExpiry : Date,
})

// look they are two things here in nextjs when ever you call a new schema is created so we have to take care of that and in mondodb everything becomes lowercase with s(plural)

const User = mongoose.models.users || mongoose.model("users",userSchema)

export default User;