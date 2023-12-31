import { baseURL, axiosInstance } from "@/lib/axios";

export type Issue = {
  id: number;
  title: string;
  description: string;
  status: "open" | "in progress" | "wait for review" | "close";
  priority: "1" | "2" | "3";
  categoryId: number;
  reporterId: number;
  assigneeId: number | undefined | null;
  projectId: number;
  createdAt: string;
  updatedAt: string;
  Reporter: { id: number; firstname: string; lastname: string };
  Assignee: { id: number; firstname: string; lastname: string };
  Category: { id: number; name: string };
};

// * 取得專案所有 issue
export async function getIssues(payload: { projectId: string }) {
  const { projectId } = payload;
  const res = await axiosInstance.get(
    `${baseURL}/projects/${projectId}/issues`,
  );
  return res.data.data;
}

// * 取得特定 issue
export async function getIssue(payload: {
  projectId: string;
  issueId: string;
}) {
  const { projectId, issueId } = payload;
  const res = await axiosInstance.get(
    `${baseURL}/projects/${projectId}/issues/${issueId}`,
  );
  return res.data.data;
}

// * 新增一筆 issue
export async function postIssue(payload: {
  projectId: string;
  formData: {
    title: string;
    description: string;
    priority: string;
    categoryId: number;
  };
}) {
  const { projectId, formData } = payload;
  const res = await axiosInstance.post(
    `${baseURL}/projects/${projectId}/issues`,
    formData,
  );
  return res.data.data;
}

// * 修改一筆 issue
export async function patchIssue(payload: {
  projectId: string;
  issueId: string;
  formData: {
    title: string;
    description: string;
    priority: string;
    categoryId: number;
    status: string;
  };
}) {
  const { projectId, issueId, formData } = payload;
  const res = await axiosInstance.patch(
    `${baseURL}/projects/${projectId}/issues/${issueId}`,
    formData,
  );
  return res.data.data;
}

// * 刪除一筆 issue
export async function deleteIssue(payload: {
  projectId: string;
  issueId: string;
}) {
  const { projectId, issueId } = payload;
  const res = await axiosInstance.delete(
    `${baseURL}/projects/${projectId}/issues/${issueId}`,
  );
  return res.data.data;
}

// * assign user to issue
export async function assignIssue(payload: {
  projectId: string;
  issueId: string;
  formData: {
    assigneeId: number;
  };
}) {
  const { projectId, issueId, formData } = payload;
  const res = await axiosInstance.patch(
    `${baseURL}/projects/${projectId}/issues/${issueId}/assign`,
    formData,
  );
  return res.data.data;
}
