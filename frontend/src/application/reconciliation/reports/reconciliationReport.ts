import type { ReconciliationStatus } from "../reconciliationTypes";

export interface ReconciliationReport {
  generatedAt: string;
  status: ReconciliationStatus;
  total: number;
  consistent: number;
  stale: number;
  conflicted: number;
  missing: number;
  failed: number;
}
