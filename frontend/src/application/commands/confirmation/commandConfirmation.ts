import type { ConfirmationState } from "./confirmationState"

export interface CommandConfirmation {
  commandId: string
  state: ConfirmationState
  required: boolean
  requestedAt?: string
  confirmedAt?: string
  reason?: string
}
