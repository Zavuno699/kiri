export class LeaseTransportError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "LeaseTransportError"
  }
}
