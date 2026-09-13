export type TransitionOutcome =
  | "allowed"
  | "blocked"
  | "completed"
  | "failed"
  | "invalid";

export interface TransitionResult {
  transitionId: string;
  entityId: string;
  fromState: string;
  toState: string | null;
  outcome: TransitionOutcome;
  allowed: boolean;
  reasons: string[];
  invariantIds: string[];
  guardIds: string[];
  correlationId: string;
}
