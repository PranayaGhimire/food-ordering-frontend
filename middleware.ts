import { NextRequest, NextResponse } from "next/server";

export const middleware = (request:NextRequest) => {
    const token = request.cookies.get('accessToken')?.value;
    const {pathname} = request.nextUrl;

    const isAuthPage = pathname.startsWith('/auth');
    const isProtectedPage = pathname.startsWith(`/profile`);
    const isAdminPage = pathname.startsWith('/admin');

    if((isProtectedPage || isAdminPage) && !token) {
        return NextResponse.redirect(new URL('/auth',request.url));
    }

    if(isAuthPage && token) {
        return NextResponse.redirect(new URL('/',request.url));
    }

    if(isAdminPage && token) {
        const payload = JSON.parse(Buffer.from(token.split(".")[1],'base64').toString());
        if(payload.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/",request.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher:['/auth/:path*',"/profile/:path*","/admin/:path*"],
};