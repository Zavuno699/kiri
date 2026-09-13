export interface CommandAuthorizationState {
  initialized: boolean;
  allowedCommands: string[];
  deniedCommands: string[];
  pendingConfirmation: string | null;
}
