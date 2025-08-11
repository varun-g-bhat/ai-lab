import { Resource } from "@/types/resource";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.BACKEND_URL,
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
