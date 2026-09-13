export type CommandLifecycle =
  | "idle"
  | "draft"
  | "validating"
  | "authorized"
  | "submitted"
  | "accepted"
  | "rejected"
  | "failed"
  | "complete"

export interface CommandState<T = unknown> {
  lifecycle: CommandLifecycle
  payload?: T
  commandId?: string
  correlationId?: string
  error?: string
  updatedAt?: string
}

export function createCommandState<T>():
  CommandState<T> {
  return {
    lifecycle: "idle",
  }
}
