import { baseURL, axiosInstance } from "@/lib/axios";

export type Category = {
  id: number;
  name: string;
  isDefault: boolean;
};

// * 取得專案所有 category
export async function getCategories(projectId) {
  const res = await axiosInstance.get(
    `${baseURL}/projects/${projectId}/categories`,
  );
  return res.data.data;
}

// * 新增一個 category
export async function postCategory(payload) {
  const { projectId, name } = payload;
  const res = await axiosInstance.post(
    `${baseURL}/projects/${projectId}/categories`,
    {
      name,
    },
  );
  return res.data.data;
}

// * 修改一個 category
export async function patchCategory(payload) {
  const { projectId, categoryId, name } = payload;
  const res = await axiosInstance.patch(
    `${baseURL}/projects/${projectId}/categories/${categoryId}`,
    {
      name,
    },
  );
  return res.data.data;
}

// * 刪除一個 category
export async function deleteCategory(payload) {
  const { projectId, categoryId } = payload;
  const res = await axiosInstance.delete(
    `${baseURL}/projects/${projectId}/categories/${categoryId}`,
  );
  return res.data.data;
}
