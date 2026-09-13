import type {
  DeviceRecord,
} from "../../features/devices/types/device"

export interface DeviceGateway {
  getDevice(
    id: string,
  ): Promise<DeviceRecord>
}
