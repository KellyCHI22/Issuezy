import { baseURL, axiosInstance } from "./apiUtils";

// * 取得 issue 所有留言
export async function getComments(payload) {
  const { projectId, issueId } = payload;
  const res = await axiosInstance.get(
    `${baseURL}/projects/${projectId}/issues/${issueId}/comments`,
  );
  return res.data;
}
