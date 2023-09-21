import { baseURL, axiosInstance } from "../../../lib/axios";

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

// * 取得特定專案資訊
export async function getProject(projectId) {
  const res = await axiosInstance.get(`${baseURL}/projects/${projectId}`);
  return res.data.data;
}

// * 取得特定專案成員
export async function getMembers(projectId) {
  const res = await axiosInstance.get(
    `${baseURL}/projects/${projectId}/members`,
  );
  return res.data.data;
}

// * 新增一個專案
export async function postProject(payload) {
  const res = await axiosInstance.post(`${baseURL}/projects`, payload);
  return res.data.data;
}
