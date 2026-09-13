import type { CommandConfirmationState } from "./confirmationState";

let state: CommandConfirmationState = {
  command: null,
  open: false,
  confirmed: false,
  requestedAt: null,
};

export function getCommandConfirmationState(): CommandConfirmationState {
  return state;
}

export function requestCommandConfirmation(
  command: string,
): void {
  state = {
    command,
    open: true,
    confirmed: false,
    requestedAt: new Date().toISOString(),
  };
}

export function confirmCommand(): void {
  state = {
    ...state,
    open: false,
    confirmed: true,
  };
}

export function cancelCommandConfirmation(): void {
  state = {
    ...state,
    open: false,
    confirmed: false,
  };
}
