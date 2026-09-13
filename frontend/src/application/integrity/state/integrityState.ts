import type { IntegrityCheck } from "../integrityCheck";

export interface IntegrityState {
  initialized: boolean;
  checks: IntegrityCheck[];
  pass: number;
  warn: number;
  fail: number;
  overall: "healthy" | "degraded" | "failed" | "unknown";
}
