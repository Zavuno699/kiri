import type { DeviceApiRecord } from "../../contracts/deviceApiRecord"

export interface DeviceListResponse {
  items: DeviceApiRecord[]
  total?: number
  page?: number
  pageSize?: number
}
