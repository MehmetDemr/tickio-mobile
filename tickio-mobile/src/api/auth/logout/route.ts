import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const baseUrl = "http://localhost:3000" ;
    
    // console.log('🔍 Fetching from:', `${baseUrl}/auth/whoami`);
    
    const cookies = request.headers.get('cookie');
    // console.log('🍪 All cookies:', cookies);
    
    if (!cookies) {
        return NextResponse.json(
            { error: 'Unauthorized - No session found' },
            { status: 401 }
        );
    }
    
    try {
        const response = await fetch(`${baseUrl}/auth/signout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookies, 
            },
            credentials: 'include',
        });


        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.log('❌ Error response:', errorData);
            return NextResponse.json(
                { error: 'Failed to fetch user data' },
                { status: response.status }
            );
        }

        const data = await response.json();
        
        return NextResponse.json(data, {
            status: 200,
        });
    } catch (error) {
        console.error('❌ API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch user data' },
            { status: 500 }
        );
    }
}