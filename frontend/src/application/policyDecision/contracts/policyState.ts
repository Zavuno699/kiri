export interface PolicyState {
  lastDecisionId: string | null;
  lastOutcome:
    | "allow"
    | "deny"
    | "conditional"
    | "blocked"
    | null;
  decisionIds: string[];
  loading: boolean;
  error: string | null;
}
