import type {
  OperationalDevice,
} from "../../../domain/contracts"
import {
  deviceSummary,
} from "../presentation/DeviceSummary"

export function createDeviceSurface(
  device?: OperationalDevice,
) {
  return device
    ? deviceSummary(device)
    : undefined
}
