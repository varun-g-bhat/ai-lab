import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-lab-1-x6f6.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const addDiscussion = async (data: {
  title: string;
  description: string;
  tags: string[];
}) => {
  return api.post("/api/v1/discussion", data);
};

export const getDiscussion = async () => {
  return api.get("/api/v1/discussion");
};

export const addReply = async (data: { id: string; reply: string }) => {
  return api.post(`/api/v1/discussion/${data.id}/replies`, data);
};
