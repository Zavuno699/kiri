export interface TransitionHistoryEntry {
  id: string;
  transitionId: string;
  entityId: string;
  domain: string;
  fromState: string;
  toState: string | null;
  outcome:
    | "allowed"
    | "blocked"
    | "completed"
    | "failed"
    | "invalid";
  correlationId: string;
  occurredAt: string;
  reasons: string[];
}
