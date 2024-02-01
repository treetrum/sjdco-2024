import { NextResponse } from 'next/server';

export function middleware(request: Request) {
    // Store the request URL so it can be read by the Next.js page
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-url', request.url);
    return NextResponse.next({ request: { headers: requestHeaders } });
}
