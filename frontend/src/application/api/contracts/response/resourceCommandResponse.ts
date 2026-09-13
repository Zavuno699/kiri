export interface ResourceCommandResponse<T = unknown> {
  accepted: boolean;
  result: T | null;
  message: string | null;
}
