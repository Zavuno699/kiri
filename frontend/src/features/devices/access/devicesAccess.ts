import {
  getDevicesAccessState,
} from "./devicesAccessState"

export function canReadDevices(): boolean {
  return getDevicesAccessState().readable
}

export function canWriteDevices(): boolean {
  return getDevicesAccessState().writable
}
