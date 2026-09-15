export interface DevicesAccessState {
  readable: boolean
  writable: boolean
  reason: string | null
}

export function getDevicesAccessState(): DevicesAccessState {
  return {
    readable: true,
    writable: false,
    reason: null,
  }
}
