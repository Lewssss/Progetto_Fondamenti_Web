export interface ApiResponse {
  success: boolean;
  skipMessage?: boolean;
  message?: string;
}

export interface ApiResponseWithData<T> extends ApiResponse {
  data: T;
}
