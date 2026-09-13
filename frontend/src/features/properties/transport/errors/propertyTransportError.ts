export class PropertyTransportError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "PropertyTransportError"
  }
}
