export interface CommandConfirmationState {
  command: string | null;
  open: boolean;
  confirmed: boolean;
  requestedAt: string | null;
}
