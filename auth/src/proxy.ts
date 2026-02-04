import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
    const publicPath = request.nextUrl.pathname
    const token = request.cookies.get("token")?.value

    const isPublicPath = ((publicPath === "/frontend/login") || (publicPath === "/frontend/signup"))

    if (isPublicPath && token) {
        // the first arugument is where you want to go and the second is to get the base url which protocol://www.website.com
        return NextResponse.redirect(new URL("/", request.nextUrl))
    }

    // if the path is not login or signup and you dont have a token then
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/frontend/login", request.nextUrl))
    }


}



export const config = {
    matcher: [
        "/",
        "/frontend/profile/:path*",
        "/frontend/login",
        "/frontend/signup"
    ]
}