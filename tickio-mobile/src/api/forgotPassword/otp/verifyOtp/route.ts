import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const baseUrl = process.env.API_URL;
    
    try {
        const body = await request.json();
        const { email,code } = body;

        const response = await fetch(`${baseUrl}/otp/verify-otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email,code }),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { 
                    error: data?.message || data?.error || 'Verifying OTP failed.' 
                },
                { status: response.status }
            );
        }

        const res = NextResponse.json(
            { 
                success: true,
                message: 'Verifying OTP successful',
                user: data
            },
            { status: 200 }
        );

        return res;
    } catch (error) {
        // console.error('OTP error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}