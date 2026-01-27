import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { MdArrowBack, MdSave } from "react-icons/md";
import type { CreateMemberInput } from "../../../types/admin.member.ts";
import { adminMemberApi } from "../../../api/admin.member.api.ts";
import { AxiosError } from "axios";

function AdminMemberNew() {
   const navigate = useNavigate();
   const [apiError, setApiError] = useState<string | null>(null);

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
   } = useForm<CreateMemberInput>({
      defaultValues: {
         grade: "SILVER",
         status: "ACTIVE",
         role: "USER",
      },
   });

   const onSubmit: SubmitHandler<CreateMemberInput> = async data => {
      setApiError(null);

      try {
         await adminMemberApi.createMember(data);
         alert("회원이 성공적으로 등록되었습니다.");
         navigate("/admin/members");
      } catch (err) {
         console.error(err);
         let message = "회원 등록 중 오류가 발생했습니다.";
         if (err instanceof AxiosError) message = err.response?.data?.message;
         setApiError(message);
      }
   };

   return (
      <div className="space-y-6 max-w-4xl mx-auto">
         <div className="flex items-center gap-4">
            <button
               onClick={() => navigate(-1)}
               className="p-2 rounded-full hover:bg-gray-200 transition-colors text-gray-600">
               <MdArrowBack className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-[#222222]">
               신규 회원 등록
            </h2>
         </div>

         <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
               {apiError && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm font-medium">
                     ⚠️ {apiError}
                  </div>
               )}

               <div>
                  <h3 className="text-lg font-bold text-[#222222] mb-4 border-b border-gray-100 pb-2">
                     계정 정보
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                           이메일 <span className="text-red-500">*</span>
                        </label>
                        <input
                           type="email"
                           placeholder="user@example.com"
                           className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 transition-colors ${
                              errors.email
                                 ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                 : "border-gray-300 focus:border-[#FFD400] focus:ring-[#FFD400]"
                           }`}
                           {...register("email", {
                              required: "이메일은 필수입니다.",
                              pattern: {
                                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                 message: "유효한 이메일 주소를 입력해주세요.",
                              },
                           })}
                        />
                        {errors.email && (
                           <p className="text-xs text-red-500 mt-1">
                              {errors.email.message}
                           </p>
                        )}
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                           비밀번호 <span className="text-red-500">*</span>
                        </label>
                        <input
                           type="password"
                           placeholder="6자 이상 입력"
                           className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 transition-colors ${
                              errors.password
                                 ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                 : "border-gray-300 focus:border-[#FFD400] focus:ring-[#FFD400]"
                           }`}
                           {...register("password", {
                              required: "비밀번호는 필수입니다.",
                              minLength: {
                                 value: 6,
                                 message:
                                    "비밀번호는 최소 6자 이상이어야 합니다.",
                              },
                           })}
                        />
                        {errors.password && (
                           <p className="text-xs text-red-500 mt-1">
                              {errors.password.message}
                           </p>
                        )}
                     </div>
                  </div>
               </div>

               <div>
                  <h3 className="text-lg font-bold text-[#222222] mb-4 border-b border-gray-100 pb-2">
                     개인 정보
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                           이름 <span className="text-red-500">*</span>
                        </label>
                        <input
                           type="text"
                           placeholder="홍길동"
                           className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 transition-colors ${
                              errors.name
                                 ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                 : "border-gray-300 focus:border-[#FFD400] focus:ring-[#FFD400]"
                           }`}
                           {...register("name", {
                              required: "이름은 필수입니다.",
                           })}
                        />
                        {errors.name && (
                           <p className="text-xs text-red-500 mt-1">
                              {errors.name.message}
                           </p>
                        )}
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                           연락처 <span className="text-red-500">*</span>
                        </label>
                        <input
                           type="text"
                           placeholder="010-1234-5678"
                           className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 transition-colors ${
                              errors.phone
                                 ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                 : "border-gray-300 focus:border-[#FFD400] focus:ring-[#FFD400]"
                           }`}
                           {...register("phone", {
                              required: "연락처는 필수입니다.",
                           })}
                        />
                        {errors.phone && (
                           <p className="text-xs text-red-500 mt-1">
                              {errors.phone.message}
                           </p>
                        )}
                     </div>
                  </div>
               </div>

               <div>
                  <h3 className="text-lg font-bold text-[#222222] mb-4 border-b border-gray-100 pb-2">
                     회원 설정
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                           회원 등급
                        </label>
                        <select
                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FFD400] focus:ring-1 focus:ring-[#FFD400] transition-colors bg-white"
                           {...register("grade")}>
                           <option value="SILVER">SILVER</option>
                           <option value="GOLD">GOLD</option>
                           <option value="VIP">VIP</option>
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                           계정 상태
                        </label>
                        <select
                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FFD400] focus:ring-1 focus:ring-[#FFD400] transition-colors bg-white"
                           {...register("status")}>
                           <option value="ACTIVE">활동 (ACTIVE)</option>
                           <option value="DORMANT">휴면 (DORMANT)</option>
                           <option value="WITHDRAWN">탈퇴 (WITHDRAWN)</option>
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                           권한
                        </label>
                        <select
                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FFD400] focus:ring-1 focus:ring-[#FFD400] transition-colors bg-white"
                           {...register("role")}>
                           <option value="USER">일반 사용자</option>
                           <option value="ADMIN">관리자</option>
                        </select>
                     </div>
                  </div>
               </div>

               <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                     type="button"
                     onClick={() => navigate(-1)}
                     className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                     취소
                  </button>
                  <button
                     type="submit"
                     disabled={isSubmitting}
                     className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#222222] text-white font-medium hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                     <MdSave className="w-5 h-5" />
                     {isSubmitting ? "저장 중..." : "회원 등록"}
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}

export default AdminMemberNew;
