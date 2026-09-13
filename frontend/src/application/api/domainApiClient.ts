import type {
  HttpMethod,
  HttpResponse,
} from "./contracts"
import type { HttpTransport } from "../transport/http/httpTransport"

export interface DomainApiClient {
  request<TRequest, TResponse>(
    method: HttpMethod,
    path: string,
    body?: TRequest,
  ): Promise<HttpResponse<TResponse>>
}

export function createDomainApiClient(
  transport: HttpTransport,
): DomainApiClient {
  return {
    request(method, path, body) {
      return transport.request({
        method,
        path,
        body,
      })
    },
  }
}
