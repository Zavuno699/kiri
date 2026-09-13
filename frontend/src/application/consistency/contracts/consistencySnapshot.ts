import type { ConsistencyCheck } from "./consistencyCheck";
import type { ConsistencyStatus } from "../consistencyTypes";

export interface ConsistencySnapshot {
  status: ConsistencyStatus;
  score: number;
  totalChecks: number;
  passedChecks: number;
  warningChecks: number;
  failedChecks: number;
  checks: ConsistencyCheck[];
  generatedAt: string;
}
