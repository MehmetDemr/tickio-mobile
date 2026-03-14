import { getEnvVar } from "@/src/utils/getEnv";

export type UpdateTaskResponse = {
  id: string;
  taskName: string;
  taskDescription: string;
  taskType: string;
  taskStatus: string;
  taskStartDate: Date;
  taskFinishDate: Date;
  active: boolean;
};

export type UpdateTaskPayload = {
  taskName?: string;
  taskDescription?: string;
  taskType?: string;
  taskStatus?: string;
  taskStartDate?: string;
  taskFinishDate?: string;
  isActive?: boolean;
};

const API_BASE_URL = getEnvVar("apiUrl");

export async function updateTask(
  id: string,
  payload: UpdateTaskPayload,
): Promise<UpdateTaskResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("An error occured.");
    }

    const data: UpdateTaskResponse = await response.json();

    return data;
  } catch (error) {
    console.error("Update task error:", error);
    if (error instanceof Error) throw error;
    throw new Error("Update task failed.");
  }
}
