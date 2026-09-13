export interface ProjectionUpdate {
  domain: string;
  resourceKey: string;
  payload: unknown;
  source:
    | "query"
    | "command"
    | "event"
    | "workflow"
    | "refresh";
  receivedAt: string;
}
