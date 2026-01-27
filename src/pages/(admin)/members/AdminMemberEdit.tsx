import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { MdArrowBack, MdSave, MdDelete } from "react-icons/md";
import type { UpdateMemberInput } from "../../../types/admin.member.ts";
import { adminMemberApi } from "../../../api/admin.member.api.ts";
import { AxiosError } from "axios";

function AdminMemberEdit() {
   const navigate = useNavigate();
   const { id } = useParams<{ id: string }>();
   const memberId = Number(id);

   const [loading, setLoading] = useState(true);
   const [apiError, setApiError] = useState<string | null>(null);

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isSubmitting },
   } = useForm<UpdateMemberInput>();

   useEffect(() => {
      if (isNaN(memberId)) {
         alert("유효하지 않은 회원 ID입니다.");
         navigate("/admin/members");
         return;
      }

      const fetchMember = async () => {
         try {
            const data = await adminMemberApi.getMember(memberId);
            reset({
               email: data.email,
               name: data.name,
               phone: data.phone,
               grade: data.grade,
               status: data.status,
               role: data.role,
               password: "",
            });
         } catch (error) {
            console.error(error);
            alert("회원 정보를 불러오는데 실패했습니다.");
            navigate("/admin/members");
         } finally {
            setLoading(false);
         }
      };

      fetchMember().then(() => {});
   }, [memberId, navigate, reset]);

   const onSubmit: SubmitHandler<UpdateMemberInput> = async data => {
      if (!window.confirm("회원 정보를 수정하시겠습니까?")) return;
      setApiError(null);

      const payload = { ...data };
      if (!payload.password) delete payload.password;

      try {
         await adminMemberApi.updateMember(memberId, payload);
         alert("회원 정보가 수정되었습니다.");
         navigate("/admin/members");
      } catch (err) {
         console.error(err);
         let message = "수정 중 오류가 발생했습니다.";
         if (err instanceof AxiosError) message = err.response?.data?.message;
         setApiError(message);
      }
   };

   const handleDelete = async () => {
      if (
         !window.confirm(
            "정말로 이 회원을 삭제하시겠습니까?\n삭제된 데이터는 복구할 수 없습니다.",
         )
      )
         return;

      try {
         await adminMemberApi.deleteMember(memberId);
         alert("회원이 삭제되었습니다.");
         navigate("/admin/members");
      } catch (err) {
         console.error(err);
         alert("삭제 중 오류가 발생했습니다.");
      }
   };

   if (loading)
      return (
         <div className="p-8 text-center text-gray-500">
            데이터를 불러오는 중...
         </div>
      );

   return (
      <div className="space-y-6 max-w-4xl mx-auto">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
               <button
                  onClick={() => navigate(-1)}
                  className="p-2 rounded-full hover:bg-gray-200 transition-colors text-gray-600">
                  <MdArrowBack className="w-6 h-6" />
               </button>
               <h2 className="text-2xl font-bold text-[#222222]">
                  회원 상세 정보
               </h2>
            </div>

            <button
               type="button"
               onClick={handleDelete}
               className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 font-medium hover:bg-red-100 transition-colors border border-red-200">
               <MdDelete className="w-5 h-5" />
               회원 삭제
            </button>
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
                           이메일
                        </label>
                        <input
                           type="email"
                           className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed focus:outline-none"
                           {...register("email")}
                           readOnly
                           title="이메일은 변경할 수 없습니다."
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                           비밀번호{" "}
                           <span className="text-xs text-gray-400 font-normal">
                              (변경 시에만 입력)
                           </span>
                        </label>
                        <input
                           type="password"
                           placeholder="변경하려면 입력하세요"
                           className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 transition-colors ${
                              errors.password
                                 ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                 : "border-gray-300 focus:border-[#FFD400] focus:ring-[#FFD400]"
                           }`}
                           {...register("password", {
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
                           이름
                        </label>
                        <input
                           type="text"
                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FFD400] focus:ring-1 focus:ring-[#FFD400] transition-colors"
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
                           연락처
                        </label>
                        <input
                           type="text"
                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FFD400] focus:ring-1 focus:ring-[#FFD400] transition-colors"
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
                     {isSubmitting ? "저장 중..." : "수정 저장"}
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}

export default AdminMemberEdit;
