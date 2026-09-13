export interface DeviceRuntime {
  domain: "devices"
  started: boolean
  readOnly: boolean
}

export const deviceRuntime: DeviceRuntime = {
  domain: "devices",
  started: false,
  readOnly: true,
}
