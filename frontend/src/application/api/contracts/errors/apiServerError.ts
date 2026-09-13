export class ApiServerError extends Error {
  readonly code = "API_SERVER_ERROR";
  readonly status = 500;

  constructor(
    message = "API server error",
  ) {
    super(message);
    this.name =
      "ApiServerError";
  }
}
