import {
  buildDeviceViewModel,
} from "../models/deviceViewModel"

export function presentDevice(
  device: Parameters<
    typeof buildDeviceViewModel
  >[0],
) {
  return buildDeviceViewModel(device)
}
