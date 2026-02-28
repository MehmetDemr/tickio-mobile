import { NextRequest, NextResponse } from "next/server";

const baseUrl = "http://localhost:3000";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, ctx: Ctx) {
  try {
    const cookies = request.headers.get("cookie");
    if (!cookies) {
      return NextResponse.json(
        { message: "Unauthorized - No session found" },
        { status: 401 }
      );
    }

    const { id } = await ctx.params;
    if (!id) {
      return NextResponse.json(
        { message: "Task id is required" },
        { status: 400 }
      );
    }

    const apiRes = await fetch(`${baseUrl}/tasks/${id}`, {
      method: "GET",
      headers: { Cookie: cookies },
    });

    const data = await apiRes.json().catch(() => ({}));
    return NextResponse.json(data, { status: apiRes.status });
  } catch (err) {
    console.error("❌ GET TASK BY ID ERROR:", err);
    return NextResponse.json(
      { message: "Failed to fetch task" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, ctx: Ctx) {
  try {
    const cookies = request.headers.get("cookie");
    if (!cookies) {
      return NextResponse.json(
        { message: "Unauthorized - No session found" },
        { status: 401 }
      );
    }

    const { id } = await ctx.params; 
    if (!id) {
      return NextResponse.json(
        { message: "Task id is required" },
        { status: 400 }
      );
    }

    const body = await request.json();

    const apiRes = await fetch(`${baseUrl}/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies,
      },
      body: JSON.stringify(body),
    });

    const data = await apiRes.json().catch(() => ({}));
    return NextResponse.json(data, { status: apiRes.status });
  } catch (err) {
    console.error("❌ PATCH TASK ERROR:", err);
    return NextResponse.json(
      { message: "Failed to update task" },
      { status: 500 }
    );
  }
}
