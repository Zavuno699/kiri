export type CrossDomainReadModel = {
  entityId: string;
  generatedAt: string;
  sources: Array<{
    domain: string;
    version: number;
    updatedAt?: string;
  }>;
  consistency: "consistent" | "mixed" | "stale";
  data: Record<string, unknown>;
};
