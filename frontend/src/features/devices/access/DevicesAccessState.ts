export interface DevicesAccessState {
  readable: boolean
  writable: boolean
  reason: string | null
}

export function resolveDevicesAccess(): DevicesAccessState {
  return {
    readable: true,
    writable: false,
    reason: null,
  }
}
