export class DomainServiceError extends Error {
  readonly domain: string
  readonly operation: string

  constructor(
    domain: string,
    operation: string,
    message: string,
  ) {
    super(message)
    this.name = "DomainServiceError"
    this.domain = domain
    this.operation = operation
  }
}
