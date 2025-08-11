import { loginData, signupData } from "@/types/auth";
import apiClient from "@/lib/axios";

export const login = async (data: loginData) => {
  return apiClient.post("/api/v1/auth/login", data);
};

export const signup = async (data: signupData) => {
  return apiClient.post("/api/v1/auth/signup", data);
};

export const verify = async () => {
  return apiClient.post("/api/v1/auth/verify");
};

export const logout = async () => {
  return apiClient.post("/api/v1/auth/logout");
};
