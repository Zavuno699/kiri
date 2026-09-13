export interface CommandDecision {
  command: string;
  allowed: boolean;
  confirmationRequired: boolean;
  executable: boolean;
  reason: string;
}
