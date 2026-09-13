export interface ResourceMutationResponse<T = unknown> {
  accepted: boolean;
  resource: T | null;
  message: string | null;
}
