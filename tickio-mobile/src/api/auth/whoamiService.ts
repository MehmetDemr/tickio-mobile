import { getEnvVar } from "@/src/utils/getEnv";

const API_BASE_URL = getEnvVar("apiUrl");

export type WhoAmITask = {
  id: string;
  taskName: string;
  taskDescription: string;
  taskType: string;
  taskStatus: string;
  taskStartDate: string;
  taskFinishDate: string;
  active: boolean;
  page: number;
  limit: number;
};

export type WhoAmIAchievement = {
  primary_achievement_id: string;
  active: boolean;
  createDate: string;
  updateDate: string;
  primaryAchievement: Record<string, unknown>;
  primaryAchievementName: string;
  primaryAchievementDescription: string;
  primaryAchievementUserPercentage: string;
};

export type WhoAmIResponse = {
  userName: string;
  email: string;
  taskCount: number;
  activeTaskCount: number;
  finishedTaskCount: number;
  achievementCount: number;
  createDate: string;
  tasks: WhoAmITask[];
  achievements: WhoAmIAchievement[];
};

export async function getWhoAmI(): Promise<WhoAmIResponse> {
  try {

    const response = await fetch(`${API_BASE_URL}/auth/whoami`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        credentials:'include'
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }

    const data: WhoAmIResponse = await response.json();
    return data;
  } catch (error) {
    console.error("WhoAmI error:", error);
    throw error;
  }
}