export interface HttpRequestOptions {
  method?: string
  headers?: Record<string, string>
  body?: unknown
  signal?: AbortSignal
}

export async function httpRequest<T>(
  url: string,
  options: HttpRequestOptions = {},
): Promise<T> {
  const headers = {
    ...(options.body !== undefined
      ? { "content-type": "application/json" }
      : {}),
    ...(options.headers ?? {}),
  }

  const response = await fetch(url, {
    method: options.method ?? "GET",
    headers,
    body:
      options.body === undefined
        ? undefined
        : JSON.stringify(options.body),
    signal: options.signal,
  })

  if (!response.ok) {
    throw new Error(
      `${options.method ?? "GET"} ${url} failed: ${response.status}`,
    )
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}
