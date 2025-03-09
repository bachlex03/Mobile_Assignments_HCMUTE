import { BaseResponseType } from '~/src/infrastructure/types/base-response.type';

export type CategoryItemType = {
   _id: string;
   category_name: string;
   category_parentId: string | null;
   category_slug: string;
};

export type CategoryResponseType = BaseResponseType<CategoryItemType[]>;
