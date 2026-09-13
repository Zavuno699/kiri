export interface ApiGateway {
  get<T>(endpoint: string): Promise<T>
  post<T>(
    endpoint: string,
    payload: unknown,
  ): Promise<T>
  put<T>(
    endpoint: string,
    payload: unknown,
  ): Promise<T>
  patch<T>(
    endpoint: string,
    payload: unknown,
  ): Promise<T>
}
