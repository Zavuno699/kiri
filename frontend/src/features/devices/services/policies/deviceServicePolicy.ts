export interface DeviceServicePolicy {
  readable: boolean
  refreshable: boolean
  commandable: boolean
}

export const deviceServicePolicy:
  DeviceServicePolicy = {
  readable: true,
  refreshable: true,
  commandable: true,
}
