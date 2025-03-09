export type PaginationType = {
   _page?: number;
   _limit?: number;
   _sort?: 'asc' | 'desc';
   _sortBy?: 'product_price' | 'createAt' | 'updatedAt';
};

export type MetaType = {
   totalItems: number;
   totalPages: number;
   currentPage: number;
   itemsPerPage: number;
};

export type PaginationResponseType<T> = {
   items: T;
   meta: MetaType;
};

export type BaseResponseType<T> = {
   message: string;
   status: number;
   data: T;
};
