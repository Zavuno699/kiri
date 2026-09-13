import {
  createRequestLifecycleContext,
} from "./requestLifecycle"
import {
  createRequestHeaders,
} from "./requestHeaders"
import {
  decodeJson,
} from "./responseDecoder"
import {
  HttpApplicationError,
} from "./httpError"

export interface HttpRequestOptions {
  method?: string
  body?: unknown
  correlationId?: string
  idempotencyKey?: string
  signal?: AbortSignal
}

export async function requestJson<T>(
  endpoint: string,
  options: HttpRequestOptions = {},
): Promise<T> {
  const method = options.method ?? "GET"

  const lifecycle =
    createRequestLifecycleContext(
      endpoint,
      method,
    )

  const response = await fetch(endpoint, {
    method,
    headers: createRequestHeaders({
      correlationId:
        options.correlationId ??
        lifecycle.requestId,
      idempotencyKey:
        options.idempotencyKey,
    }),
    body:
      options.body == null
        ? undefined
        : JSON.stringify(options.body),
    signal: options.signal,
  })

  if (!response.ok) {
    let payload:
      | {
          code?: string
          message?: string
          correlationId?: string
          details?: unknown
        }
      | undefined

    try {
      payload =
        (await response.json()) as typeof payload
    } catch {
      payload = undefined
    }

    throw new HttpApplicationError(
      payload?.message ??
        `Request failed with status ${response.status}.`,
      response.status,
      payload,
    )
  }

  return decodeJson<T>(response)
}
