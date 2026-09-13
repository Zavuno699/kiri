export class ApiNotFoundError extends Error {
  readonly code = "API_NOT_FOUND";
  readonly status = 404;

  constructor(
    message = "API resource not found",
  ) {
    super(message);
    this.name =
      "ApiNotFoundError";
  }
}
