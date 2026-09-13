import {
  getUnifiedRuntimeState,
} from "../state/unifiedRuntimeStore";

export interface UnifiedRuntimeHealth {
  healthy: boolean;
  degraded: boolean;
  failed: boolean;
  score: number;
  reasons: string[];
}

export function getUnifiedRuntimeHealth(): UnifiedRuntimeHealth {
  const state =
    getUnifiedRuntimeState();

  const reasons = [...state.reasons];

  const score = Math.round(
    (
      state.consistencyScore +
      state.domainHealthScore
    ) / 2,
  );

  return {
    healthy:
      state.status === "ready" &&
      reasons.length === 0,
    degraded:
      state.status === "limited" ||
      state.status === "restricted",
    failed:
      state.status === "failed",
    score,
    reasons,
  };
}
