import { NextRequest, NextResponse } from "next/server";

const baseUrl = "http://localhost:3000" ; 

export async function POST(request: NextRequest) {
  try {
    // Cookie'leri NextRequest'ten al
    const cookies = request.headers.get('cookie');
    
    if (!cookies) {
      return NextResponse.json(
        { message: "Unauthorized - No session found" },
        { status: 401 }
      );
    }

    const body = await request.json();

    if (!body.taskName || !body.taskStatus || !body.taskType) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Body'yi temizle 
    const cleanBody = Object.fromEntries(
      Object.entries(body).filter(([_, v]) => v !== undefined)
    );

    const apiRes = await fetch(`${baseUrl}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookies,
      },
      credentials: 'include',
      body: JSON.stringify(cleanBody), 
    });

    if (!apiRes.ok) {
      const errorData = await apiRes.json().catch(() => ({}));
      console.log('❌ Backend error:', errorData);
      return NextResponse.json(
        { message: errorData?.message || "Backend error" },
        { status: apiRes.status }
      );
    }

    const data = await apiRes.json();
    // console.log('✅ Task created:', data);

    return NextResponse.json(data, { status: 201 });

  } catch (err) {
    console.error("❌ TASK CREATE ERROR:", err);
    return NextResponse.json(
      { message: "Failed to create task" },
      { status: 500 }
    );
  }
}