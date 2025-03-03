export type loginPayloadType = {
  email: string;
  password: string;
};

export type loginResponseType = {
  accessToken: string;
  refreshToken: string;
};

export type OtpPayloadType = {
  q: string;
  otp: string;
};

export type VerifyType = {
  _q?: string;
  _verify_type?:
    | "email"
    | "resetPassword"
    | "changeEmail"
    | "changePhoneNumber"
    | any;
};
