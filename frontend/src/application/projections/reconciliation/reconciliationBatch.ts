import type { ProjectionReconciliationResult } from "./projectionReconciliation";

export type ReconciliationBatch = {
  startedAt: string;
  completedAt?: string;
  items: ProjectionReconciliationResult[];
  refreshRequired: number;
  divergences: number;
};
