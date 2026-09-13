export interface GlobalStateEvent {
  id: string;
  type: string;
  domain: string | null;
  resourceId: string | null;
  payload: unknown;
  occurredAt: string;
  correlationId: string | null;
  causationId: string | null;
  source:
    | "command"
    | "query"
    | "event"
    | "api"
    | "realtime"
    | "workflow"
    | "ui"
    | "system";
}
