import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const baseUrl = process.env.API_URL;
    
    try {
        const body = await request.json();
        const { newPassword,resetToken } = body;

        const response = await fetch(`${baseUrl}/auth/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newPassword,resetToken }),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { 
                    error: data?.message || data?.error || 'Reset password failed.' 
                },
                { status: response.status }
            );
        }

        const res = NextResponse.json(
            { 
                success: true,
                message: 'Reset Password successful',
                user: data
            },
            { status: 200 }
        );

        return res;
    } catch (error) {
        // console.error('Reset Password error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}