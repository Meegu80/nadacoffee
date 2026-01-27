import { type ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { MdArrowBack, MdSave } from "react-icons/md";
import type {
   Category,
   CreateCategoryInput,
} from "../../../types/admin.category.ts";
import { adminCategoryApi } from "../../../api/admin.category.api.ts";

function AdminCategoryNew() {
   const navigate = useNavigate();
   const [parents, setParents] = useState<Category[]>([]);

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
   } = useForm<CreateCategoryInput>({
      defaultValues: { sortOrder: 0 },
   });

   useEffect(() => {
      adminCategoryApi.getCategoryTree().then(setParents).catch(console.error);
   }, []);

   const onSubmit: SubmitHandler<CreateCategoryInput> = async data => {
      try {
         const payload = {
            ...data,
            parentId: data.parentId ? Number(data.parentId) : null,
         };
         await adminCategoryApi.createCategory(payload);
         alert("카테고리가 등록되었습니다.");
         navigate("/admin/categories");
      } catch (error) {
         console.error(error);
         alert("등록 실패");
      }
   };

   const renderOptions = (
      categories: Category[],
      depth = 0,
   ): ReactNode[] => {
      const options: ReactNode[] = [];
      categories.forEach(cat => {
         options.push(
            <option key={cat.id} value={cat.id}>
               {"-".repeat(depth)} {cat.name}
            </option>,
         );
         if (cat.categories && cat.categories.length > 0) {
            options.push(...renderOptions(cat.categories, depth + 1));
         }
      });
      return options;
   };

   return (
      <div className="space-y-6 max-w-2xl mx-auto">
         <div className="flex items-center gap-4">
            <button
               onClick={() => navigate(-1)}
               className="p-2 rounded-full hover:bg-gray-200 transition-colors text-gray-600">
               <MdArrowBack className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-[#222222]">카테고리 등록</h2>
         </div>

         <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
               <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                     상위 카테고리
                  </label>
                  <select
                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FFD400] focus:ring-1 focus:ring-[#FFD400] bg-white"
                     {...register("parentId")}>
                     <option value="">(최상위 카테고리)</option>
                     {renderOptions(parents)}
                  </select>
                  <p className="text-xs text-gray-500">
                     선택하지 않으면 대분류(1차 카테고리)로 생성됩니다.
                  </p>
               </div>

               <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                     카테고리명 <span className="text-red-500">*</span>
                  </label>
                  <input
                     type="text"
                     placeholder="예: 원두, 콜드브루"
                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FFD400] focus:ring-1 focus:ring-[#FFD400]"
                     {...register("name", {
                        required: "카테고리명은 필수입니다.",
                     })}
                  />
                  {errors.name && (
                     <p className="text-xs text-red-500">
                        {errors.name.message}
                     </p>
                  )}
               </div>

               <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                     정렬 순서
                  </label>
                  <input
                     type="number"
                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FFD400] focus:ring-1 focus:ring-[#FFD400]"
                     {...register("sortOrder", { valueAsNumber: true })}
                  />
                  <p className="text-xs text-gray-500">
                     낮은 숫자가 먼저 표시됩니다.
                  </p>
               </div>

               <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                     type="button"
                     onClick={() => navigate(-1)}
                     className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50">
                     취소
                  </button>
                  <button
                     type="submit"
                     disabled={isSubmitting}
                     className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#222222] text-white font-medium hover:bg-black transition-colors">
                     <MdSave className="w-5 h-5" />
                     저장
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}

export default AdminCategoryNew;
