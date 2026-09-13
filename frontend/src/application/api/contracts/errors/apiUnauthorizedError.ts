export class ApiUnauthorizedError extends Error {
  readonly code = "API_UNAUTHORIZED";
  readonly status = 401;

  constructor(
    message = "API authorization denied",
  ) {
    super(message);
    this.name =
      "ApiUnauthorizedError";
  }
}
