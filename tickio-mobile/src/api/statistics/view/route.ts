import { NextRequest, NextResponse } from "next/server";

const baseUrl = "http://localhost:3000";

export async function GET(request: NextRequest) {
  try {
    const cookies = request.headers.get('cookie');
    // console.log('🍪 Fetching tasks with cookies:', cookies);

    if (!cookies) {
      return NextResponse.json(
        { message: "Unauthorized - No session found" },
        { status: 401 }
      );
    }

    const apiRes = await fetch(`${baseUrl}/statistics/current`, {
      method: "GET",
      headers: {
        "Cookie": cookies,
      },
      credentials: 'include',
    });

    // console.log('📥 Backend response status:', apiRes.status);

    if (!apiRes.ok) {
      const errorData = await apiRes.json().catch(() => ({}));
      console.log('❌ Backend error:', errorData);
      return NextResponse.json(
        { message: errorData?.message || "Failed to fetch statistics" },
        { status: apiRes.status }
      );
    }

    const data = await apiRes.json();
    // console.log('✅ Statistics fetched:', data.length);

    return NextResponse.json(data, { status: 200 });

  } catch (err) {
    console.error("❌ FETCH STATISTICS ERROR:", err);
    return NextResponse.json(
      { message: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}