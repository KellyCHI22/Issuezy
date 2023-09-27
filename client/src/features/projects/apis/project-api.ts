import { baseURL, axiosInstance } from "@/lib/axios";

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
    isDefault: boolean;
  }[];
};

// * 取得所有專案
export async function getProjects() {
  const res = await axiosInstance.get(`${baseURL}/projects`);
  return res.data.data;
}

// * 取得特定專案資訊
export async function getProject(payload: { projectId: string }) {
  const { projectId } = payload;
  const res = await axiosInstance.get(`${baseURL}/projects/${projectId}`);
  return res.data.data;
}

// * 取得特定專案成員
export async function getMembers(payload: { projectId: string }) {
  const { projectId } = payload;
  const res = await axiosInstance.get(
    `${baseURL}/projects/${projectId}/members`,
  );
  return res.data.data;
}

// * 新增一個專案
export async function postProject(payload: {
  formData: {
    name: string;
    description: string;
    isPublic: boolean;
  };
}) {
  const { formData } = payload;
  const res = await axiosInstance.post(`${baseURL}/projects`, formData);
  return res.data.data;
}

// * 更新專案資訊
export async function patchProject(payload: {
  projectId: string;
  formData: {
    name: string;
    description: string;
    isPublic: boolean;
  };
}) {
  const { projectId, formData } = payload;
  const res = await axiosInstance.patch(
    `${baseURL}/projects/${projectId}`,
    formData,
  );
  return res.data.data;
}

// * 刪除一個專案
export async function deleteProject(payload: { projectId: string }) {
  const { projectId } = payload;
  const res = await axiosInstance.delete(`${baseURL}/projects/${projectId}`);
  return res.data.data;
}

// * 新增專案成員
export async function addMember(payload: {
  projectId: string;
  formData: {
    email: string;
  };
}) {
  const { projectId, formData } = payload;
  const res = await axiosInstance.post(
    `${baseURL}/projects/${projectId}/members`,
    formData,
  );
  return res.data.data;
}

// * 移除專案成員
export async function removeMember(payload: {
  projectId: string;
  memberId: string;
}) {
  const { projectId, memberId } = payload;
  const res = await axiosInstance.delete(
    `${baseURL}/projects/${projectId}/members/${memberId}`,
  );
  return res.data.data;
}
