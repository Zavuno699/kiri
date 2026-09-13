export type CrossDomainSnapshot = {
  snapshotId: string;
  entityId: string;
  capturedAt: string;
  domains: string[];
  versions: Record<string, number>;
  state: Record<string, unknown>;
  consistency: "consistent" | "mixed" | "stale";
};
