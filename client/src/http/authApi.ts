import { loginData, signupData } from "@/types/auth";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const login = async (data: loginData) => {
  return api.post("/api/v1/auth/login", data);
};

export const signup = async (data: signupData) => {
  return api.post("/api/v1/auth/signup", data);
};

export const verify = async () => {
  return api.post("/api/v1/auth/verify");
};

export const logout = async () => {
  return api.post("/api/v1/auth/logout");
};
