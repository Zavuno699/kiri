import { env } from "../config/env"

export class ApiClientError extends Error {
  status: number
  requestId?: string

  constructor(
    message: string,
    status: number,
    requestId?: string,
  ) {
    super(message)
    this.name = "ApiClientError"
    this.status = status
    this.requestId = requestId
  }
}

async function parseResponse<T>(response: Response): Promise<T> {
  const requestId =
    response.headers.get("x-request-id") ??
    response.headers.get("x-correlation-id") ??
    undefined

  const contentType = response.headers.get("content-type") ?? ""

  let body: unknown

  if (contentType.includes("application/json")) {
    body = await response.json()
  } else {
    body = await response.text()
  }

  if (!response.ok) {
    const message =
      typeof body === "object" &&
      body !== null &&
      "message" in body &&
      typeof body.message === "string"
        ? body.message
        : `Request failed with status ${response.status}`

    throw new ApiClientError(message, response.status, requestId)
  }

  return body as T
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(
    `${env.apiBaseUrl}${path.startsWith("/") ? path : `/${path}`}`,
    {
      ...init,
      headers: {
        Accept: "application/json",
        ...(init?.body ? { "Content-Type": "application/json" } : {}),
        ...init?.headers,
      },
    },
  )

  return parseResponse<T>(response)
}
