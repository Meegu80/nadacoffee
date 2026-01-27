import type {
   CreateMemberInput,
   GetMemberResponse,
   GetMembersResponse,
   Member,
   UpdateMemberInput,
} from "../types/admin.member.ts";
import api from "./axios.ts";

export const adminMemberApi = {
   getMembers: async (page: number = 1, limit: number = 10) => {
      const { data } = await api.get<GetMembersResponse>("/admin/members", {
         params: { page, limit },
      });
      return data;
   },

   getMember: async (id: number) => {
      const { data } = await api.get<GetMemberResponse>(`/admin/members/${id}`);
      return data.data; // 편의상 Member 객체만 바로 반환
   },

   createMember: async (body: CreateMemberInput) => {
      const { data } = await api.post<{ message: string; data: Member }>(
         "/admin/members",
         body,
      );
      return data;
   },

   updateMember: async (id: number, body: UpdateMemberInput) => {
      const { data } = await api.put<{ message: string; data: Member }>(
         `/admin/members/${id}`,
         body,
      );
      return data;
   },

   deleteMember: async (id: number) => {
      const { data } = await api.delete<{ message: string; deletedId: number }>(
         `/admin/members/${id}`,
      );
      return data;
   },
};
