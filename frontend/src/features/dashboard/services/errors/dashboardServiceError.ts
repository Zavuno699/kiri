export class DashboardServiceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "DashboardServiceError"
  }
}
