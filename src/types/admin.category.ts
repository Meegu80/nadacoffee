export interface Category {
   id: number;
   name: string;
   parentId: number | null;
   depth: number;
   sortOrder: number;
   categories?: Category[];
}

export interface CreateCategoryInput {
   name: string;
   parentId?: number | null;
   sortOrder?: number;
}

export interface UpdateCategoryInput {
   name?: string;
   parentId?: number | null;
   sortOrder?: number;
}
