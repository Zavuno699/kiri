import type {
  ConsistencySeverity,
  ConsistencyStatus,
} from "../consistencyTypes";

export interface ConsistencyCheck {
  key: string;
  domain: string;
  status: ConsistencyStatus;
  severity: ConsistencySeverity;
  score: number;
  reason: string;
  checkedAt: string;
}
