import type {
  ApiRequestContext,
} from "../contracts/apiRequestContext";
import type {
  ApiResponse,
} from "../contracts/apiResponse";

export interface ResourceClient {
  list<T>(
    path: string,
    context?: ApiRequestContext,
  ): Promise<ApiResponse<T[]>>;

  get<T>(
    path: string,
    context?: ApiRequestContext,
  ): Promise<ApiResponse<T>>;

  create<TBody, TResponse>(
    path: string,
    body: TBody,
    context?: ApiRequestContext,
  ): Promise<ApiResponse<TResponse>>;

  update<TBody, TResponse>(
    path: string,
    body: TBody,
    context?: ApiRequestContext,
  ): Promise<ApiResponse<TResponse>>;

  command<TBody, TResponse>(
    path: string,
    body: TBody,
    context?: ApiRequestContext,
  ): Promise<ApiResponse<TResponse>>;
}
