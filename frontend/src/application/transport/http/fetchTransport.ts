import type {
  HttpRequest,
  HttpResponse,
} from "../../api/contracts"
import type { HttpTransport } from "./httpTransport"

export interface FetchTransportConfig {
  baseUrl: string
  fetcher?: typeof fetch
}

export function createFetchTransport(
  config: FetchTransportConfig,
): HttpTransport {
  const fetcher = config.fetcher ?? fetch

  return {
    async request<TRequest, TResponse>(
      request: HttpRequest<TRequest>,
    ): Promise<HttpResponse<TResponse>> {
      const query = request.query
        ? new URLSearchParams(
            Object.entries(request.query)
              .filter(([, value]) =>
                value !== undefined &&
                value !== null,
              )
              .map(([key, value]) => [
                key,
                String(value),
              ]),
          ).toString()
        : ""

      const url =
        `${config.baseUrl}${request.path}` +
        (query ? `?${query}` : "")

      const response = await fetcher(url, {
        method: request.method,
        headers: request.headers,
        body:
          request.body === undefined
            ? undefined
            : JSON.stringify(request.body),
      })

      let data: unknown

      try {
        data = await response.json()
      } catch {
        data = undefined
      }

      return {
        status: response.status,
        headers: Object.fromEntries(
          response.headers.entries(),
        ),
        data: data as TResponse | undefined,
        correlationId:
          response.headers.get(
            "X-Correlation-ID",
          ) ?? undefined,
      }
    },
  }
}
