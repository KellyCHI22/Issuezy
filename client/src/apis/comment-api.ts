import { baseURL, axiosInstance } from "./apiUtils";

// * 取得 issue 所有留言
export async function getComments(payload) {
  const { projectId, issueId } = payload;
  const res = await axiosInstance.get(
    `${baseURL}/projects/${projectId}/issues/${issueId}/comments`,
  );
  return res.data;
}

// * 新增一筆留言
export async function postComment(payload) {
  const { projectId, issueId, text } = payload;
  const res = await axiosInstance.post(
    `${baseURL}/projects/${projectId}/issues/${issueId}/comments`,
    {
      text,
    },
  );
  return res.data;
}
