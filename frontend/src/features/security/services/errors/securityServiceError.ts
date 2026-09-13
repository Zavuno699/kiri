export class SecurityServiceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "SecurityServiceError"
  }
}
