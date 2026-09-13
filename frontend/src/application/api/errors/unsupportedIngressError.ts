export class UnsupportedIngressError extends Error {
  constructor(
    domain: string,
  ) {
    super(
      `${domain} production HTTP ingress is not verified.`,
    )
    this.name = "UnsupportedIngressError"
  }
}
