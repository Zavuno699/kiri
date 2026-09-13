export interface EventProjectionLink {
  id: string;
  eventType: string;
  projectionId: string;
  relation:
    | "updates"
    | "invalidates"
    | "triggers"
    | "rebuilds";
  required: boolean;
}
