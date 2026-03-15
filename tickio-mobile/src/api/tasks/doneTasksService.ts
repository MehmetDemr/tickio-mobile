import { getEnvVar } from "@/src/utils/getEnv";

const API_BASE_URL = getEnvVar("apiUrl");

export type AwardedAchievement = {
  primaryAchievement: {
    title: string;
    description: string;
  };
};

export type MarkTaskAsDoneResponse = {
  message?: string;
  awarded?: AwardedAchievement[];
};

export async function markTaskAsDone(
  id: string,
): Promise<MarkTaskAsDoneResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}/done`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData?.message || "Failed to mark task as done");
    }

    return await response.json().catch(() => ({}));
  } catch (error) {
    console.error("Mark task as done error:", error);
    throw error;
  }
}