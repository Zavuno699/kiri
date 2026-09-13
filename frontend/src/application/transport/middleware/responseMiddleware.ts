import type { HttpResponse } from "../../api/contracts"

export type ResponseMiddleware = <T>(
  response: HttpResponse<T>,
) => HttpResponse<T>
