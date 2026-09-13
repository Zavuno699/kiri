export class DeviceServiceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "DeviceServiceError"
  }
}
