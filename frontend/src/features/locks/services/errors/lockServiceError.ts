export class LockServiceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "LockServiceError"
  }
}
