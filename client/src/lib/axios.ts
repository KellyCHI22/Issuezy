import axios from "axios";

const baseURL = "http://localhost:3000/api";

const axiosInstance = axios.create({
  baseURL,
});

export interface ErrorResponseData {
  status: "error";
  message: string;
}

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  },
);

export { baseURL, axiosInstance };
