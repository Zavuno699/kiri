export interface LockCommandRequest {
  lockId: string;
  command: string;
  payload?: Record<string, unknown>;
}
