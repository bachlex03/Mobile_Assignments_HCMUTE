export type PaginationType = {
   _q?: string;
   _page?: number;
   _limit?: number;
   _sort?: 'asc' | 'desc';
   _sortBy?: 'product_price' | 'createAt' | 'updatedAt';
   _product_sizes?: string;
   _product_colors?: string;
   _product_types?: 'clothe' | 'trousers' | 'shoes';
   _product_gender?: 'Woman' | 'Man' | 'Unisex';
   _product_brand?: 'Gucci' | 'Chanel' | 'Prada' | 'Louis Vuitton';
   _min_price?: number;
   _max_price?: number;
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
