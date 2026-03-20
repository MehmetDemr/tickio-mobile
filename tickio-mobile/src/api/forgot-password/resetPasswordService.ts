import { getEnvVar } from "@/src/utils/getEnv";

const API_BASE_URL = getEnvVar("apiUrl");

export async function resetPassword(
  newPassword: string,
  resetToken: string,
) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newPassword, resetToken }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "An error occured.");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Password reseting failed.");
  }
}
