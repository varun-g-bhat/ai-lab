import { Resource } from "@/types/resource";
import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-lab-1-x6f6.onrender.com",
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});

export const getResources = async () => {
  return api.get("/api/v1/resource");
};

export const addResources = async (data) => {
  return api.post("/api/v1/resource", data);
};
