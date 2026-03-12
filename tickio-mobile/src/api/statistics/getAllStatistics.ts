import { getEnvVar } from "@/src/utils/getEnv";

export type GetAllStatisticResponse = {
  data: {
    id: number;
    user: {
      id: string;
      userName: string;
      role: string;
    };
    totalTask: number;
    finishedTask: number;
    activeTask: number;
    taskOverall: number;
    todayTask: number;
    monthTask: number;
    yearTask: number;
    dayStreak: number;
    mostDayStreak: number;
    lastLoginDate: Date;
    updateDate: Date;
  };
};

const API_BASE_URL = getEnvVar("apiUrl");


export async function getAllStatistics(): Promise<GetAllStatisticResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/statistics`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch statistics");
    }

    const data: GetAllStatisticResponse = await response.json();

    return data;
  } catch (error) {
    console.error("Statistic fetch error:", error);
    throw error;
  }
}
