export interface PersistenceOperation {
  operationId: string;
  type:
    | "read"
    | "write"
    | "invalidate"
    | "refresh";
  domain: string;
  resourceKey: string;
  startedAt: string;
  completedAt: string | null;
  success: boolean;
  error: string | null;
}
