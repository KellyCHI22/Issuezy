import { baseURL, axiosInstance } from "./apiUtils";

export async function getCurrentUser() {
  const res = await axiosInstance.get(`${baseURL}/users/current`);
  return res.data.data;
}
