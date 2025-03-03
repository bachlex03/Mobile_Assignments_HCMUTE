export type BaseResponseType<T> = {
  message: string;
  status: number;
  data: T;
};
