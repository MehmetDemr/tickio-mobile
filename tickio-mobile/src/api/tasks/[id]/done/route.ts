import { NextRequest, NextResponse } from "next/server";

const baseUrl = "http://localhost:3000" ;

type Ctx = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, ctx: Ctx) {
  try {
    const cookies = request.headers.get("cookie");
    if (!cookies) {
      return NextResponse.json(
        { message: "Unauthorized - No session found" },
        { status: 401 },
      );
    }

    const { id } = await ctx.params;
    if (!id) {
      return NextResponse.json(
        { message: "Task id is required" },
        { status: 400 },
      );
    }

    const apiRes = await fetch(`${baseUrl}/tasks/${id}/done`, {
      method: "POST",
      headers: { Cookie: cookies },
    });

    const data = await apiRes.json().catch(() => ({}));
    return NextResponse.json(data, { status: apiRes.status });
  } catch (err) {
    // console.error("❌ DONE TASK BY ID:", err);
    return NextResponse.json(
      { message: "Failed to fetch done task." },
      { status: 500 },
    );
  }
}
