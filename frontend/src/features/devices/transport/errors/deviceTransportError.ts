export class DeviceTransportError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "DeviceTransportError"
  }
}
