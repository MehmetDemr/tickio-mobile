import { getEnvVar } from "@/src/utils/getEnv";

const API_BASE_URL = getEnvVar("apiUrl");

export async function sendOtp(email: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/otp/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "An error occured.");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Sending verification code failed.");
  }
}
