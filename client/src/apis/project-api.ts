import { baseURL, axiosInstance } from "./apiUtils";

// * 取得所有專案
export async function getProjects() {
  const res = await axiosInstance.get(`${baseURL}/projects`);
  return res.data.data;
}

export async function getProject(projectId) {
  const res = await axiosInstance.get(`${baseURL}/projects/${projectId}`);
  return res.data.data;
}

// * 新增一個專案
export async function postProject(payload) {
  const res = await axiosInstance.post(`${baseURL}/projects`, payload);
  return res.data.data;
}
