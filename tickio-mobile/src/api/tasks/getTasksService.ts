import { getEnvVar } from "@/src/utils/getEnv";

export type TaskItem = {
  id: string;
  taskName: string;
  taskDescription: string;
  taskType: string;
  taskStatus: string;
  taskStartDate: string;
  taskFinishDate: string | null;
  createDate: string;
  updateDate: string;
  active: boolean;
  user_id: string;
};

export type GetTaskResponse = {
  data: TaskItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    pageCount: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
};

const API_BASE_URL = getEnvVar("apiUrl");

export async function getTasks(
  page: number = 1,
  limit: number = 10,
): Promise<GetTaskResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/tasks?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }

    const data: GetTaskResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Tasks fetch error:", error);
    throw error;
  }
}
