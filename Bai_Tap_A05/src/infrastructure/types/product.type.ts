import {
   BaseResponseType,
   PaginationResponseType,
} from '~/src/infrastructure/types/base-response.type';

export type ProductItemType = {
   _id: string;
   product_name: string;
   product_code: string;
   product_price: number;
   product_stocks: number;
   product_sizes: string[];
   product_colors: string[];
   product_gender: string;
   product_brand: string;
   product_type: string;
   product_description: string;
   product_category: {
      _id: string;
      category_name: string;
      category_slug: string;
   };
   product_imgs: [
      {
         public_id: string;
         secure_url: string;
      },
   ];
   product_promotion: null;
   product_status: string[];
   product_slug: string;
   __v: 0;
   updatedAt: string;
};

export type ProductResponseType = BaseResponseType<
   PaginationResponseType<ProductItemType[]>
>;
