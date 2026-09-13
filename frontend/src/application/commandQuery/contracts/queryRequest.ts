export interface QueryRequest {
  queryId: string;
  entityId: string | null;
  domain: string;
  parameters: Record<string, unknown>;
  requestedAt: string;
}
