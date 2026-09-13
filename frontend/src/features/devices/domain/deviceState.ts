import type { OperationalDevice } from "../../../domain/contracts"

export function deviceIsOnline(
  device: OperationalDevice,
): boolean {
  return device.online ?? false
}
