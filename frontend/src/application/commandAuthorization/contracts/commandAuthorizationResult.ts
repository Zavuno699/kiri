export interface CommandAuthorizationResult {
  allowed: boolean;
  requiresConfirmation: boolean;
  reason: string;
  command: string;
}
