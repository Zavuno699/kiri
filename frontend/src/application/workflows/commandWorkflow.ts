import type {
  CommandState,
} from "../commands/commandState"

export function isTerminalCommandState(
  state: CommandState,
): boolean {
  return (
    state.lifecycle === "accepted" ||
    state.lifecycle === "rejected" ||
    state.lifecycle === "failed" ||
    state.lifecycle === "complete"
  )
}

export function isCommandInFlight(
  state: CommandState,
): boolean {
  return (
    state.lifecycle === "validating" ||
    state.lifecycle === "authorized" ||
    state.lifecycle === "submitted"
  )
}
