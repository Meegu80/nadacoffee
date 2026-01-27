import type { MemberGrade, MemberRole, MemberStatus } from "./user.ts";

export interface Member {
   id: number;
   email: string;
   name: string;
   phone: string;
   grade: MemberGrade;
   status: MemberStatus;
   role: MemberRole;
   createdAt: string;
   updatedAt: string;
}

export interface Pagination {
   totalMembers: number;
   totalPages: number;
   currentPage: number;
   limit: number;
}

export interface GetMembersResponse {
   data: Member[];
   pagination: Pagination;
}

export interface GetMemberResponse {
   data: Member;
}

export interface CreateMemberInput {
   email: string;
   password: string;
   name: string;
   phone: string;
   grade?: MemberGrade;
   status?: MemberStatus;
   role?: MemberRole;
}

export interface UpdateMemberInput {
   email?: string;
   password?: string;
   name?: string;
   phone?: string;
   grade?: MemberGrade;
   status?: MemberStatus;
   role?: MemberRole;
}
