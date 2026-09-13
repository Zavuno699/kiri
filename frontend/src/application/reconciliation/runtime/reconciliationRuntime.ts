import type { ReconciliationStatus } from "../reconciliationTypes";
import {
  setReconciliationState,
} from "../state/reconciliationStore";

export function recordReconciliationRun(input: {
  status: ReconciliationStatus;
  total: number;
  consistent: number;
  stale: number;
  conflicted: number;
  missing: number;
  failed: number;
}): void {
  setReconciliationState({
    initialized: true,
    totalChecked: input.total ?? 0,
    lastRunAt: new Date().toISOString(),
    ...input,
  });
}
