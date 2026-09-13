import type {
  EventEnvelope,
} from "../../../contracts/events/eventEnvelope"
import {
  eventTypes,
} from "../../../contracts/events/eventTypes"

export interface DeviceEventProjection {
  deviceId: string
  status?: string
  commandId?: string
}

export class DeviceEventProjector {
  supports(type: string): boolean {
    return (
      type === eventTypes.deviceConnected ||
      type === eventTypes.deviceDisconnected ||
      type === eventTypes.deviceCommandCompleted ||
      type === eventTypes.deviceCommandFailed
    )
  }

  project(
    event: EventEnvelope<Record<string, unknown>>,
  ): DeviceEventProjection {
    return {
      deviceId: String(
        event.payload.deviceId ??
          event.payload.device_id ??
          "",
      ),
      status:
        typeof event.payload.status === "string"
          ? event.payload.status
          : undefined,
      commandId:
        typeof event.payload.commandId === "string"
          ? event.payload.commandId
          : undefined,
    }
  }
}
