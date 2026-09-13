export interface EndToEndTrace {
  id: string;
  commandId: string | null;
  commandCorrelationId: string | null;
  eventIds: string[];
  projectionIds: string[];
  stateEntityIds: string[];
  auditIds: string[];
  anomalyIds: string[];
  status:
    | "complete"
    | "partial"
    | "blocked"
    | "failed"
    | "unknown";
}
