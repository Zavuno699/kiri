import { createResourceStore } from "../../../application/stores/resourceStore"
import type { DeviceRecord } from "../types/device"

export const deviceStore =
  createResourceStore<DeviceRecord>()
