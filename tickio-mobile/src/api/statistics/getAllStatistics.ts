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


export async function getAllStatistics():Promise<GetAllStatisticResponse> {
    
}
