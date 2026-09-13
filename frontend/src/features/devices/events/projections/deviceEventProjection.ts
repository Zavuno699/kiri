import type { DeviceEvent } from "../deviceEvent"

export interface DeviceEventProjection {
  apply(event: DeviceEvent): unknown
}
