import { baseURL, axiosInstance } from "./apiUtils";

// * 取得專案所有 issue
export async function getIssues(projectId) {
  const res = await axiosInstance.get(
    `${baseURL}/projects/${projectId}/issues`,
  );
  return res.data;
}

// * 新增一筆 issue
export async function postIssue(payload) {
  const { projectId, formData } = payload;
  const res = await axiosInstance.post(
    `${baseURL}/projects/${projectId}/issues`,
    formData,
  );
  return res.data;
}
