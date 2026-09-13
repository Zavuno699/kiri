export interface DeviceRegistration {
  id: "devices"
  registered: boolean
  readOnly: boolean
}

export const deviceRegistration: DeviceRegistration = {
  id: "devices",
  registered: true,
  readOnly: true,
}
