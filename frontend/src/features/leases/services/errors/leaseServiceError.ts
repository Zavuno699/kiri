export class LeaseServiceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "LeaseServiceError"
  }
}
