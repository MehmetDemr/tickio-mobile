import { getEnvVar } from "@/src/utils/getEnv";

const API_BASE_URL = getEnvVar("apiUrl");

export async function verifyOtp(email: string, code: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/otp/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, code }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "An error occured.");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Verification failed.");
  }
}
