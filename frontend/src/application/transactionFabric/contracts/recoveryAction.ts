export interface RecoveryAction {
  id: string;
  transactionId: string;
  stepId: string | null;
  action: string;
  domain: string;
  strategy:
    | "retry"
    | "compensate"
    | "reconcile"
    | "abort"
    | "manual";
  enabled: boolean;
  reason: string;
}
