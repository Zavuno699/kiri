import type { LiveEvent } from "../events/liveEvent"

export interface LiveCommandProjection {
  commandId?: string
  state:
    | "unknown"
    | "accepted"
    | "completed"
    | "failed"
    | "blocked"
  message?: string
  updatedAt: string
}

export function projectLiveCommand(
  event: LiveEvent,
): LiveCommandProjection {
  const payload =
    event.payload &&
    typeof event.payload === "object"
      ? event.payload as Record<
          string,
          unknown
        >
      : {}

  let state:
    LiveCommandProjection["state"] =
    "unknown"

  if (
    event.type.includes("accepted")
  ) {
    state = "accepted"
  } else if (
    event.type.includes("completed")
  ) {
    state = "completed"
  } else if (
    event.type.includes("failed")
  ) {
    state = "failed"
  } else if (
    event.type.includes("blocked")
  ) {
    state = "blocked"
  }

  return {
    commandId:
      typeof payload.commandId ===
      "string"
        ? payload.commandId
        : undefined,
    state,
    message:
      typeof payload.message ===
      "string"
        ? payload.message
        : undefined,
    updatedAt:
      new Date().toISOString(),
  }
}
