import { baseURL, axiosInstance } from "../../../lib/axios";

export type Comment = {
  id: number;
  text: string;
  issueId: number;
  userId: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  User: {
    id: number;
    firstname: string;
    lastname: string;
  };
};

// * 取得 issue 所有留言
export async function getComments(payload) {
  const { projectId, issueId } = payload;
  const res = await axiosInstance.get(
    `${baseURL}/projects/${projectId}/issues/${issueId}/comments`,
  );
  return res.data.data;
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
  return res.data.data;
}

// * 修改一筆留言
export async function patchComment(payload) {
  const { projectId, issueId, commentId, text } = payload;
  const res = await axiosInstance.patch(
    `${baseURL}/projects/${projectId}/issues/${issueId}/comments/${commentId}`,
    {
      text,
    },
  );
  return res.data.data;
}

// * 刪除一筆留言
export async function deleteComment(payload) {
  const { projectId, issueId, commentId } = payload;
  const res = await axiosInstance.delete(
    `${baseURL}/projects/${projectId}/issues/${issueId}/comments/${commentId}`,
  );
  return res.data.data;
}
