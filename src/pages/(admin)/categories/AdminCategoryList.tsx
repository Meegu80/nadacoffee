import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
   MdAdd,
   MdEdit,
   MdDelete,
   MdSubdirectoryArrowRight,
   MdFolder,
} from "react-icons/md";
import type { Category } from "../../../types/admin.category.ts";
import { adminCategoryApi } from "../../../api/admin.category.api.ts";

function AdminCategoryList() {
   const [categories, setCategories] = useState<Category[]>([]);
   const [loading, setLoading] = useState(false);

   const fetchCategories = async () => {
      setLoading(true);
      try {
         const data = await adminCategoryApi.getCategoryTree();
         setCategories(data);
      } catch (error) {
         console.error("Failed to fetch categories:", error);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchCategories().then(() => {});
   }, []);

   const flattenCategories = (cats: Category[], result: Category[] = []) => {
      cats.forEach(cat => {
         result.push(cat);
         if (cat.categories && cat.categories.length > 0) {
            flattenCategories(cat.categories, result);
         }
      });
      return result;
   };

   const flatCategoryList = flattenCategories(categories);

   const handleDelete = async (id: number) => {
      if (
         !window.confirm(
            "정말 삭제하시겠습니까?\n하위 카테고리는 최상위로 이동됩니다.",
         )
      )
         return;
      try {
         await adminCategoryApi.deleteCategory(id);
         alert("삭제되었습니다.");
         fetchCategories().then(() =>{});
      } catch (error) {
         console.error(error);
         alert("삭제 중 오류가 발생했습니다.");
      }
   };

   return (
      <div className="space-y-6">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
               <h2 className="text-2xl font-bold text-[#222222]">
                  카테고리 관리
               </h2>
               <p className="text-sm text-gray-500 mt-1">
                  상품 분류 체계를 관리합니다.
               </p>
            </div>

            <Link
               to="/admin/categories/new"
               className="flex items-center gap-2 bg-[#222222] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black transition-colors">
               <MdAdd className="w-5 h-5" />
               카테고리 등록
            </Link>
         </div>

         <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold">
                        <th className="px-6 py-4 w-20">ID</th>
                        <th className="px-6 py-4">카테고리명</th>
                        <th className="px-6 py-4 w-32">순서</th>
                        <th className="px-6 py-4 w-40 text-center">관리</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                     {loading ? (
                        <tr>
                           <td
                              colSpan={4}
                              className="px-6 py-12 text-center text-gray-500">
                              로딩 중...
                           </td>
                        </tr>
                     ) : flatCategoryList.length === 0 ? (
                        <tr>
                           <td
                              colSpan={4}
                              className="px-6 py-12 text-center text-gray-500">
                              등록된 카테고리가 없습니다.
                           </td>
                        </tr>
                     ) : (
                        flatCategoryList.map(cat => (
                           <tr
                              key={cat.id}
                              className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 text-gray-500">
                                 #{cat.id}
                              </td>
                              <td className="px-6 py-4">
                                 <div
                                    className="flex items-center"
                                    style={{
                                       paddingLeft: `${(cat.depth - 1) * 24}px`,
                                    }}>
                                    {cat.depth > 1 && (
                                       <MdSubdirectoryArrowRight className="w-4 h-4 text-gray-400 mr-2" />
                                    )}
                                    <span
                                       className={`flex items-center gap-2 ${cat.depth === 1 ? "font-bold text-[#222222]" : "text-gray-700"}`}>
                                       {cat.depth === 1 && (
                                          <MdFolder className="text-[#FFD400]" />
                                       )}
                                       {cat.name}
                                    </span>
                                 </div>
                              </td>
                              <td className="px-6 py-4 text-gray-600">
                                 {cat.sortOrder}
                              </td>
                              <td className="px-6 py-4 text-center">
                                 <div className="flex items-center justify-center gap-2">
                                    <Link
                                       to={`/admin/categories/${cat.id}`}
                                       className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-[#222222] transition-colors"
                                       title="수정">
                                       <MdEdit className="w-4 h-4" />
                                    </Link>
                                    <button
                                       onClick={() => handleDelete(cat.id)}
                                       className="p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                                       title="삭제">
                                       <MdDelete className="w-4 h-4" />
                                    </button>
                                 </div>
                              </td>
                           </tr>
                        ))
                     )}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
}

export default AdminCategoryList;
