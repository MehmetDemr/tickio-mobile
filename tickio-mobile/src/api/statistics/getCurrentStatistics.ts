import { getEnvVar } from "@/src/utils/getEnv";

export type GetStatisticResponse = {
  id: string;
  user_id: string;
  totalTask: number;
  finishedTask: number;
  activeTask: number;
  taskOverall: number;
  todayTask: number;
  monthTask: number;
  yearTask: number;
  mostValuableDay: string;
  mostValuableDate: Date;
  dayStreak: number;
  mostDayStreak: number;
  mostFavouriteCategory: string;
  lastLoginDate: Date;
  createDate: Date;
  updateDate: Date;
  active: boolean;
};

const API_BASE_URL = getEnvVar("apiUrl");

export async function getStatistic(): Promise<GetStatisticResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/statistics/current`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch statistics");
    }

    const data: GetStatisticResponse = await response.json();

    return data;
  } catch (error) {
    console.error("Statistic fetch error:", error);
    throw error;
  }
}
