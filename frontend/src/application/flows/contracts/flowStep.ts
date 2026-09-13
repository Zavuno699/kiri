export type FlowStepKind =
  | "command"
  | "query"
  | "event"
  | "api"
  | "projection"
  | "persistence"
  | "authorization";

export interface FlowStep {
  key: string;
  kind: FlowStepKind;
  domain: string;
  action: string;
  required: boolean;
}
