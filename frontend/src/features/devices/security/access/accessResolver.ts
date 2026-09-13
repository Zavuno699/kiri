export interface DevicesAccessState {
  read: boolean
  write: boolean
  reason: string | null
}

export function resolveDevicesAccess(): DevicesAccessState {
  return {
    read: true,
    write: false,
    reason: null,
  }
}
