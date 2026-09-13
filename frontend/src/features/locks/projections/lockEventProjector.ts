import type {
  EventEnvelope,
} from "../../../contracts/events/eventEnvelope"
import {
  eventTypes,
} from "../../../contracts/events/eventTypes"

export interface LockEventProjection {
  lockId?: string
  deviceId?: string
  state?: string
  commandId?: string
}

export class LockEventProjector {
  supports(type: string): boolean {
    return (
      type === eventTypes.lockStateChanged ||
      type === eventTypes.lockCommand ||
      type === eventTypes.lockCommandResult
    )
  }

  project(
    event: EventEnvelope<Record<string, unknown>>,
  ): LockEventProjection {
    return {
      lockId:
        typeof event.payload.lockId === "string"
          ? event.payload.lockId
          : undefined,
      deviceId:
        typeof event.payload.deviceId === "string"
          ? event.payload.deviceId
          : undefined,
      state:
        typeof event.payload.state === "string"
          ? event.payload.state
          : undefined,
      commandId:
        typeof event.payload.commandId === "string"
          ? event.payload.commandId
          : undefined,
    }
  }
}
