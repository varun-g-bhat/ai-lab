import { Lab, Question } from "@/types/lab";

const API_BASE_URL = `${"https://ai-lab-2.onrender.com"}/api/v1`;

export const api = {
  async getEnrolledLabs(): Promise<Lab[]> {
    const response = await fetch(`${API_BASE_URL}/lab/enrolled`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch enrolled labs");
    }

    const enrolledLabs = await response.json();
    console.log("Enrolled Labs:", enrolledLabs);
    return enrolledLabs;
  },

  async getLabQuestions(labId: string): Promise<Question[]> {
    const response = await fetch(`${API_BASE_URL}/questions/lab/${labId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch lab questions");
    }
    return response.json();
  },
};
