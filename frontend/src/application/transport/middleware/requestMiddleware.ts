import type { HttpRequest } from "../../api/contracts"

export type RequestMiddleware = <T>(
  request: HttpRequest<T>,
) => HttpRequest<T>
