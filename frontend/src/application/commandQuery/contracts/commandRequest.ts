export interface CommandRequest {
  commandId: string;
  entityId: string | null;
  domain: string;
  parameters: Record<string, unknown>;
  correlationId: string;
  requestedAt: string;
}
