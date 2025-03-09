import {
   BaseResponseType,
   PaginationResponseType,
} from '~/src/infrastructure/types/base-response.type';

export type ProductItemType = {
   _id: string;
   id: string;
   product_slug: string;
};

export type ProductResponseType = BaseResponseType<
   PaginationResponseType<ProductItemType[]>
>;
