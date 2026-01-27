import api from "./axios";
import type {
   Category,
   CreateCategoryInput,
   UpdateCategoryInput,
} from "../types/admin.category.ts";

export const adminCategoryApi = {
   getCategoryTree: async () => {
      const { data } = await api.get<{ message: string; data: Category[] }>(
         "/categories",
      );
      return data.data;
   },

   getCategory: async (id: number) => {
      const { data } = await api.get<{ message: string; data: Category }>(
         `/categories/${id}`,
      );
      return data.data;
   },

   createCategory: async (body: CreateCategoryInput) => {
      const { data } = await api.post<{ message: string; data: Category }>(
         "/admin/categories",
         body,
      );
      return data;
   },

   updateCategory: async (id: number, body: UpdateCategoryInput) => {
      const { data } = await api.put<{ message: string; data: Category }>(
         `/admin/categories/${id}`,
         body,
      );
      return data;
   },

   deleteCategory: async (id: number) => {
      const { data } = await api.delete<{ message: string; deletedId: number }>(
         `/admin/categories/${id}`,
      );
      return data;
   },
};
