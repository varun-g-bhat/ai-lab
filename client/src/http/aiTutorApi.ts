import { ILesson } from "@/types/aitutor";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const generateRoadmap = async (topic: string) => {
  return api.post(`/api/v1/ai-tutor/roadmap/${topic}`);
};

export const fetchRoadmap = async () => {
  return api.get(`/api/v1/ai-tutor/roadmap`);
};

export const fetchRoadmapByID = async (id?: string) => {
  return api.get(`/api/v1/ai-tutor/roadmap/${id}`);
};

export const generateContent = async (data: ILesson) => {
  return api.post(`/api/v1/ai-tutor/generatecontent`, data);
};

export const getContent = async (id?: string) => {
  return api.get(`/api/v1/ai-tutor/getcontent/${id}`);
};
