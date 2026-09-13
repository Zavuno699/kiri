export type MaterializedReadModel<T = unknown> = {
  domain: string;
  entityId: string;
  projectionVersion: number;
  generatedAt: string;
  data: T;
  freshness: "fresh" | "aging" | "stale" | "unknown";
};
