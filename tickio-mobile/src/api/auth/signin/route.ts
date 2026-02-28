import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const baseUrl = "http://localhost:3000";
    
    try {
        const body = await request.json();
        const { email, password } = body;

        // Backend'e login isteği at
        const response = await fetch(`${baseUrl}/auth/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include', 
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { 
                    error: data?.message || data?.error || 'Login failed' 
                },
                { status: response.status }
            );
        }

        const setCookieHeader = response.headers.get('set-cookie');

        const res = NextResponse.json(
            { 
                success: true,
                message: 'Login successful',
                user: data
            },
            { status: 200 }
        );

        if (setCookieHeader) {
            res.headers.set('set-cookie', setCookieHeader);
        }

        return res;
    } catch (error) {
        // console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}