import type { ReconciliationStatus } from "../reconciliationTypes";

export interface ReconciliationState {
  initialized: boolean;
  lastRunAt: string | null;
  status: ReconciliationStatus;
  totalChecked: number;
  consistent: number;
  stale: number;
  conflicted: number;
  missing: number;
  failed: number;
}
