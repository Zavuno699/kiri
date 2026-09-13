export class ApiConflictError extends Error {
  readonly code = "API_CONFLICT";
  readonly status = 409;

  constructor(
    message = "API resource conflict",
  ) {
    super(message);
    this.name =
      "ApiConflictError";
  }
}
