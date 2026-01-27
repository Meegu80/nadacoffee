import { type ReactNode, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { MdArrowBack, MdSave, MdDelete } from "react-icons/md";
import type {
   Category,
   UpdateCategoryInput,
} from "../../../types/admin.category.ts";
import { adminCategoryApi } from "../../../api/admin.category.api.ts";

function AdminCategoryDetail() {
   const navigate = useNavigate();
   const { id } = useParams<{ id: string }>();
   const categoryId = Number(id);

   const [parents, setParents] = useState<Category[]>([]);
   const {
      register,
      handleSubmit,
      reset,
      formState: { isSubmitting },
   } = useForm<UpdateCategoryInput>();

   useEffect(() => {
      adminCategoryApi.getCategoryTree().then(setParents).catch(console.error);

      // 2. 현재 카테고리 정보 로드
      if (!isNaN(categoryId)) {
         adminCategoryApi
            .getCategory(categoryId)
            .then(data =>
               reset({
                  name: data.name,
                  parentId: data.parentId,
                  sortOrder: data.sortOrder,
               }),
            )
            .catch(() => {
               alert("카테고리 정보를 찾을 수 없습니다.");
               navigate("/admin/categories");
            });
      }
   }, [categoryId, navigate, reset]);

   const onSubmit: SubmitHandler<UpdateCategoryInput> = async data => {
      try {
         const payload = {
            ...data,
            parentId: data.parentId ? Number(data.parentId) : null,
         };
         // 자기 자신을 부모로 설정하는 것 방지 (간단한 체크)
         if (payload.parentId === categoryId) {
            alert("자기 자신을 상위 카테고리로 설정할 수 없습니다.");
            return;
         }

         await adminCategoryApi.updateCategory(categoryId, payload);
         alert("수정되었습니다.");
         navigate("/admin/categories");
      } catch (error) {
         console.error(error);
         alert("수정 실패");
      }
   };

   const handleDelete = async () => {
      if (!window.confirm("정말 삭제하시겠습니까?")) return;
      try {
         await adminCategoryApi.deleteCategory(categoryId);
         alert("삭제되었습니다.");
         navigate("/admin/categories");
      } catch (error) {
         console.error(error);
         alert("삭제 실패");
      }
   };

   const renderOptions = (categories: Category[], depth = 0): ReactNode[] => {
      const options: ReactNode[] = [];
      categories.forEach(cat => {
         options.push(
            <option
               key={cat.id}
               value={cat.id}
               disabled={cat.id === categoryId}>
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
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
               <button
                  onClick={() => navigate(-1)}
                  className="p-2 rounded-full hover:bg-gray-200 transition-colors text-gray-600">
                  <MdArrowBack className="w-6 h-6" />
               </button>
               <h2 className="text-2xl font-bold text-[#222222]">
                  카테고리 수정
               </h2>
            </div>
            <button
               onClick={handleDelete}
               className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 font-medium hover:bg-red-100 border border-red-200">
               <MdDelete className="w-5 h-5" /> 삭제
            </button>
         </div>

         <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
               <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                     상위 카테고리
                  </label>
                  <select
                     className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
                     {...register("parentId")}>
                     <option value="">(최상위 카테고리)</option>
                     {renderOptions(parents)}
                  </select>
               </div>

               <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                     카테고리명
                  </label>
                  <input
                     type="text"
                     className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                     {...register("name", { required: true })}
                  />
               </div>

               <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                     정렬 순서
                  </label>
                  <input
                     type="number"
                     className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                     {...register("sortOrder")}
                  />
               </div>

               <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                     type="button"
                     onClick={() => navigate(-1)}
                     className="px-6 py-2.5 rounded-lg border border-gray-300">
                     취소
                  </button>
                  <button
                     type="submit"
                     disabled={isSubmitting}
                     className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#222222] text-white font-medium">
                     <MdSave className="w-5 h-5" /> 저장
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}

export default AdminCategoryDetail;
