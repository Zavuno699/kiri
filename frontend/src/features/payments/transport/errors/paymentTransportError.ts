export class PaymentTransportError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "PaymentTransportError"
  }
}
