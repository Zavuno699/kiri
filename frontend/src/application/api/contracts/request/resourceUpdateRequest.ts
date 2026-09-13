export interface ResourceUpdateRequest<T = unknown> {
  id: string;
  payload: T;
}
