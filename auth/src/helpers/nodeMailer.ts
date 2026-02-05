import nodemailer from "nodemailer"
import User from "../models/userModel.js"
import bcrypt from "bcryptjs"

export const sendMail = async ({ email, emailType, userId }) => {
    try {

        // lest craeate a hash token to verify
        const hashToken = await bcrypt.hash(userId.toString(), 10);


        if (emailType.toLowerCase() === "verify") {
            console.log("hi")
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken: hashToken,
                    verifyTokenExpiry: Date.now() + 24 * 60 * 60 * 60
                }
            )
            console.log(userId
            )
        }
        else if (emailType.toLowerCase() === "reset") {
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashToken,
                    forgotPasswordTokenExpiry: Date.now() + 24 * 60 * 60 * 60
                }
            )

        }


        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "c5b9783c2119b0",
                pass: "b1456bf6708903"
            }
        });

        const mailOptions = {
            from: "abc@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/frontend/verify?token=${hashToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}</p>`
        }

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;
    } catch (error: any) {
        throw new Error(error.message)
    }
}