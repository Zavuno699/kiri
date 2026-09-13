export class DashboardTransportError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "DashboardTransportError"
  }
}
