import type {
  ApplicationService,
} from "../../../application/services/service"
import type {
  DeviceRecord,
} from "../types/device"

export interface DeviceDetailRequest {
  deviceId: string
}

export class DeviceDetailService
  implements
    ApplicationService<
      DeviceDetailRequest,
      DeviceRecord
    >
{
  constructor(
    private readonly load: (
      id: string,
    ) => Promise<DeviceRecord>,
  ) {}

  execute(
    request: DeviceDetailRequest,
  ): Promise<DeviceRecord> {
    return this.load(request.deviceId)
  }
}
