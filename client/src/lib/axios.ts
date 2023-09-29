import axios from "axios";

function getBaseUrl() {
  if (import.meta.env.MODE === "development") {
    return import.meta.env.VITE_API_ENDPOINT;
  } else {
    return process.env.API_ENDPOINT;
  }
}

const baseURL = getBaseUrl();

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
