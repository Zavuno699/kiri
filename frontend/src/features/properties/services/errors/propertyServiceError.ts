export class PropertyServiceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "PropertyServiceError"
  }
}
