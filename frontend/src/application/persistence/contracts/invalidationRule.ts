export interface InvalidationRule {
  key: string;
  sourceDomain: string;
  sourceResource: string;
  targetDomain: string;
  targetResource: string;
  reason:
    | "mutation"
    | "event"
    | "workflow"
    | "manual"
    | "security";
}
