import { getEnvVar } from "@/src/utils/getEnv";

export type LoginResponse = {
  user?: {
    id: string;
    email?: string;
    achievementCount?: number;
    activeTaskCount?: number;
    createDate?: Date;
    finishedTaskCount?: number;
    taskCount: number;
    userName: string;
  };
};

const API_BASE_URL = getEnvVar("apiUrl");

export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`An error occured.`);
    }

    const data = await response.json();

    return { user: data };
  } catch (error) {
    console.error("Login error:", error);
    if (error instanceof Error) throw error;
    throw new Error("Login failed.");
  }
}
