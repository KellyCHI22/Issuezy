import { baseURL, axiosInstance } from "../../../lib/axios";

export type CurrentUser = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  createdAt: string;
};

export async function getCurrentUser() {
  const res = await axiosInstance.get(`${baseURL}/users/current`);
  return res.data.data;
}
