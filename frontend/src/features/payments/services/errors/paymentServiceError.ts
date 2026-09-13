export class PaymentServiceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "PaymentServiceError"
  }
}
