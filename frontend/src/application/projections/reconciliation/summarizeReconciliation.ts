import type { ReconciliationBatch } from "./reconciliationBatch";
import type { ProjectionReconciliationResult } from "./projectionReconciliation";

export function summarizeReconciliation(
  items: ProjectionReconciliationResult[],
  startedAt = new Date().toISOString(),
): ReconciliationBatch {
  return {
    startedAt,
    completedAt: new Date().toISOString(),
    items,
    refreshRequired: items.filter(
      (item) => item.requiresRefresh,
    ).length,
    divergences: items.filter(
      (item) => item.state === "diverged",
    ).length,
  };
}
