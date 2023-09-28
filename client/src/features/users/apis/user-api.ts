import { baseURL, axiosInstance } from "@/lib/axios";

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

export async function patchUser(payload: {
  userId: string;
  formData: {
    firstname: string;
    lastname: string;
  };
}) {
  const { userId, formData } = payload;
  const res = await axiosInstance.patch(`${baseURL}/users/${userId}`, formData);
  return res.data.data;
}
