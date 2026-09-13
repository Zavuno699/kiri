import { apiFetch } from "../../../api/client"
import type {
  DeviceDetail,
  DeviceRecord,
} from "../types/device"

export async function listDevices(): Promise<DeviceRecord[]> {
  throw new Error(
    "Device collection endpoint is not exposed by the current backend HTTP contract",
  )
}

export async function getDevice(
  id: string,
): Promise<DeviceDetail> {
  return apiFetch<DeviceDetail>(`/api/v1/devices/${id}`)
}
