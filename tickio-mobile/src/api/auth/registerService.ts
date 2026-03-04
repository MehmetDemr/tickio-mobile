import { getEnvVar } from "@/src/utils/getEnv";

const API_BASE_URL = getEnvVar("apiUrl");

export async function register(
  email: string,
  userName: string,
  password: string,
) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, userName, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorData = await response.json();
      console.log("API Error:", errorData);
      throw new Error(`An error occured.`);
    }

    return { user: data };
  } catch (error) {
    console.error("Register error:", error);
    if (error instanceof Error) throw error;
    throw new Error("Register failed.");
  }
}
