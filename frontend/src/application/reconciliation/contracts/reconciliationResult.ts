import type { ReconciliationStatus } from "../reconciliationTypes";

export interface ReconciliationResult<T> {
  status: ReconciliationStatus;
  local: T | null;
  authoritative: T | null;
  conflicts: string[];
  stale: boolean;
  recoverable: boolean;
}
