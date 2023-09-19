import { baseURL, axiosInstance } from "./apiUtils";

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
export async function getIssues(projectId) {
  const res = await axiosInstance.get(
    `${baseURL}/projects/${projectId}/issues`,
  );
  return res.data.data;
}

// * 取得特定 issue
export async function getIssue(payload) {
  const { projectId, issueId } = payload;
  const res = await axiosInstance.get(
    `${baseURL}/projects/${projectId}/issues/${issueId}`,
  );
  return res.data.data;
}

// * 新增一筆 issue
export async function postIssue(payload) {
  const { projectId, formData } = payload;
  const res = await axiosInstance.post(
    `${baseURL}/projects/${projectId}/issues`,
    formData,
  );
  return res.data.data;
}
