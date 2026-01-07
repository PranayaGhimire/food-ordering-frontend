import { NextRequest, NextResponse } from "next/server";

export function middleware(request:NextRequest) {
    const token = request.cookies.get('accessToken')?.value;
    const {pathname} = request.nextUrl;

    const isAuthPage = pathname.startsWith('/auth');
    const isProtectedPage = pathname.startsWith(`/profile`);
    if(isProtectedPage && !token) {
        return NextResponse.redirect(new URL('/auth',request.url));
    }

    if(isAuthPage && token) {
        return NextResponse.redirect(new URL('/',request.url));
    }
    return NextResponse.next();
}