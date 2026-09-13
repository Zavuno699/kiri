export interface OperatorActionDecision {
  action: string;
  visible: boolean;
  enabled: boolean;
  requiresConfirmation: boolean;
  reason: string;
}
