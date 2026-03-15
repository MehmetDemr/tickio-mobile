import { getEnvVar } from "@/src/utils/getEnv";

export type Statistic = {
  id: string;
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
  lastLoginDate: string;
  updateDate: string;
};

export type Meta = {
  page: number;
  limit: number;
  total: number;
  pageCount: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export type GetAllStatisticResponse = {
  data: Statistic[];
  meta: Meta;
};

export type GetAllStatisticsParams = {
  page?: number;
  limit?: number;
  [key: string]: string | number | boolean | undefined;
};

const API_BASE_URL = getEnvVar("apiUrl");

export async function getAllStatistics(
  params: GetAllStatisticsParams = {}
): Promise<GetAllStatisticResponse> {
  try {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });

    const queryString = searchParams.toString();
    const url = queryString
      ? `${API_BASE_URL}/statistics?${queryString}`
      : `${API_BASE_URL}/statistics`;

    const response = await fetch(url, {
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