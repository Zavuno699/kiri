export interface DeviceResourcePolicy {
  cacheable: boolean
  refreshable: boolean
  commandable: boolean
}

export const deviceResourcePolicy:
  DeviceResourcePolicy = {
  cacheable: true,
  refreshable: true,
  commandable: true,
}
