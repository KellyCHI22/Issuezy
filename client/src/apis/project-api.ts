import { baseURL, axiosInstance } from "./apiUtils";

export type Project = {
  id: number;
  name: string;
  description: string;
  isPublic: boolean;
  creatorId: number;
  createdAt: string;
  Creator: {
    id: number;
    firstname: string;
    lastname: string;
  };
  Members: {
    id: number;
    firstname: string;
    lastname: string;
  }[];
  Issues: {
    id: number;
    title: string;
    isDeleted: boolean;
  }[];
  categories: {
    id: number;
    name: string;
  }[];
};

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
