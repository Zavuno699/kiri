export interface DeviceNavigation {
  label: string
  path: string
  enabled: boolean
}

export const deviceNavigation: DeviceNavigation = {
  label: "Devices",
  path: "/devices",
  enabled: true,
}
