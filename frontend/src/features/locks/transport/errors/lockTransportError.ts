export class LockTransportError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "LockTransportError"
  }
}
