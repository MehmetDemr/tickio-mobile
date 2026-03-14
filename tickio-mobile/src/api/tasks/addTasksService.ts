import { getEnvVar } from "@/src/utils/getEnv";

export type AddTaskResponse = {
  id: string;
  taskName: string;
  taskDescription: string;
  taskType: string;
  taskStatus: string;
  taskStartDate: Date;
  taskFinishDate: Date;
  active: boolean;
};

export type AddTaskPayload = {
  taskName: string;
  taskDescription: string;
  taskType: string;
  taskStatus: string;
  taskStartDate: string;
  taskFinishDate: string;
  isActive: boolean;
};

const API_BASE_URL = getEnvVar("apiUrl");

export async function addTasks(
  payload: AddTaskPayload,
): Promise<AddTaskResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`An error occured.`);
    }

    const data: AddTaskResponse = await response.json();

    return data;
  } catch (error) {
    console.error("Add task error:", error);
    if (error instanceof Error) throw error;
    throw new Error("Add task failed.");
  }
}
