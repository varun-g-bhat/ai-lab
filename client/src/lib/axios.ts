import axios from "axios";

// Create a global axios instance with default configurations
const apiClient = axios.create({
  baseURL: "https://ai-lab-1-x6f6.onrender.com",
  withCredentials: true, // Always include cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to ensure credentials are always sent
apiClient.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized errors globally
      console.error("Unauthorized access - redirecting to login");
      // You can add redirect logic here if needed
    }
    return Promise.reject(error);
  }
);

export default apiClient;
