import { BaseResponseType } from "~/src/infrastructure/types/base.type";

export type UpdateProfilePayload = {
  firstName?: string;
  lastName?: string;
};

export type ChangePhoneNumberPayload = {
  changedPhoneNumber?: string;
};

export type ChangePhoneNumberResponseType = {
  redirect: string;
};

export type ChangePhoneNumberResponseBase =
  BaseResponseType<ChangePhoneNumberResponseType>;
