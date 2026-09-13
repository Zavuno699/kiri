import type { ReconciliationStatus } from "./reconciliationStatus";

export type EntityReconciliation = {
  domain: string;
  entityId: string;
  status: ReconciliationStatus;
  sourceVersion: number;
  materializedVersion: number;
  refreshRequired: boolean;
};
