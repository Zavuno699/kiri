export interface ResourceCommandRequest<T = unknown> {
  resourceId?: string;
  action: string;
  payload: T;
}
