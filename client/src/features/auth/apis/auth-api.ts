import axios from "axios";
import { baseURL } from "@/lib/axios";

const axiosInstance = axios.create({
  baseURL,
});

export async function userLogin(payload: { email: string; password: string }) {
  const { email, password } = payload;
  const { data } = await axiosInstance.post(`${baseURL}/users/signin`, {
    email,
    password,
  });
  return data;
}

export async function userSignup(payload: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  passwordCheck: string;
}) {
  const { firstname, lastname, email, password, passwordCheck } = payload;
  const { data } = await axiosInstance.post(`${baseURL}/users/signup`, {
    firstname,
    lastname,
    email,
    password,
    passwordCheck,
  });
  return data;
}

export async function checkPermission({ token }: { token: string }) {
  const { data } = await axiosInstance.post(`${baseURL}/users/permission`, {
    token,
  });
  return data;
}
