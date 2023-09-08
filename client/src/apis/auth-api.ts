import axios from "axios";
import { baseURL } from "./apiUtils";

const axiosInstance = axios.create({
  baseURL,
});

export async function userLogin({ email, password }) {
  const { data } = await axiosInstance.post(`${baseURL}/users/signin`, {
    email,
    password,
  });
  return data;
}

export async function userSignup({ name, email, password, passwordCheck }) {
  const { data } = await axiosInstance.post(`${baseURL}/users/signup`, {
    name,
    email,
    password,
    passwordCheck,
  });
  return data;
}

export async function checkPermission({ token }) {
  const { data } = await axiosInstance.post(`${baseURL}/users/permission`, {
    token
  });
  return data;
}
