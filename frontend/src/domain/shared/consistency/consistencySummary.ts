export type ConsistencySummary = {
  overall: "consistent" | "mixed" | "stale" | "unknown";
  domains: Record<
    string,
    "consistent" | "mixed" | "stale" | "unknown"
  >;
  refreshedAt: string;
};
