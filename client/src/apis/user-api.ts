import { baseURL, axiosInstance } from "./apiUtils";

export async function getCurrentUser() {
  const { data } = await axiosInstance.get(`${baseURL}/users/current`);
  return data;
}
