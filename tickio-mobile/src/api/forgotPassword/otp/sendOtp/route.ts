import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const baseUrl = process.env.API_URL;
    
    try {
        const body = await request.json();
        const { email } = body;

        const response = await fetch(`${baseUrl}/otp/send-otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { 
                    error: data?.message || data?.error || 'Sending OTP failed.' 
                },
                { status: response.status }
            );
        }

        const res = NextResponse.json(
            { 
                success: true,
                message: 'Sending OTP successful',
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