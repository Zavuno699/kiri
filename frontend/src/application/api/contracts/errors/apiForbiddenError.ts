export class ApiForbiddenError extends Error {
  readonly code = "API_FORBIDDEN";
  readonly status = 403;

  constructor(
    message = "API access forbidden",
  ) {
    super(message);
    this.name =
      "ApiForbiddenError";
  }
}
