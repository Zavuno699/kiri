export class SecurityTransportError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "SecurityTransportError"
  }
}
