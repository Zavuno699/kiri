import type { DeviceApiRecord } from "../../contracts/deviceApiRecord"

export interface DeviceDetailResponse {
  data: DeviceApiRecord
  correlationId?: string
}
