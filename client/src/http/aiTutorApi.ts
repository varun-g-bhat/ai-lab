import { ILesson } from "@/types/aitutor";
import apiClient from "@/lib/axios";

export const generateRoadmap = async (topic: string) => {
  return apiClient.post(`/api/v1/ai-tutor/roadmap/${topic}`);
};

export const fetchRoadmap = async () => {
  return apiClient.get(`/api/v1/ai-tutor/roadmap`);
};

export const fetchRoadmapByID = async (id?: string) => {
  return apiClient.get(`/api/v1/ai-tutor/roadmap/${id}`);
};

export const generateContent = async (data: ILesson) => {
  return apiClient.post(`/api/v1/ai-tutor/generatecontent`, data);
};

export const getContent = async (id?: string) => {
  return apiClient.get(`/api/v1/ai-tutor/getcontent/${id}`);
};
