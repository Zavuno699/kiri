export function mapStatusError(
  status: number,
): string {
  switch (status) {
    case 400:
      return "Invalid request."
    case 401:
      return "Authentication required."
    case 403:
      return "Authorization denied."
    case 404:
      return "Resource not found."
    case 409:
      return "Resource conflict."
    case 422:
      return "Domain validation failed."
    case 429:
      return "Rate limit reached."
    default:
      return status >= 500
        ? "Backend service failure."
        : "Request failed."
  }
}
