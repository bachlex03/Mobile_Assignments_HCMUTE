export type loginPayloadType = {
  email: string;
  password: string;
};

export type loginResponseType = {
  accessToken: string;
  refreshToken: string;
};
