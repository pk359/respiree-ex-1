export interface IApiError {
  code: number;
  message: string;
}
export interface IApiResponse<T> {
  error?: IApiError;
  data?: T;
}
