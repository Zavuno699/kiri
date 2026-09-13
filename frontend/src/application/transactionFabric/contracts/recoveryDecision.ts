export interface RecoveryDecision {
  transactionId: string;
  strategy:
    | "retry"
    | "compensate"
    | "reconcile"
    | "abort"
    | "manual";
  allowed: boolean;
  reasons: string[];
  evaluatedAt: string;
}
