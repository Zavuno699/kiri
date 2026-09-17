import { env } from "../config/env"
import { getAuthenticationState, clearAuthenticationState } from "../application/authentication/state/authenticationStore"

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
    // Handle 401 unauthorized - clear auth state and redirect to sign-in
    if (response.status === 401) {
      const authState = getAuthenticationState()
      if (authState.authenticated) {
        clearAuthenticationState()
        // Redirect to sign-in page (window.location for full page refresh)
        if (typeof window !== "undefined") {
          window.location.href = "/signin"
        }
      }
    }

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
  options?: { useIdentityService?: boolean },
): Promise<T> {
  const baseUrl = options?.useIdentityService ? env.identityServiceUrl : env.apiBaseUrl
  const authState = getAuthenticationState()
  
  const headers = new Headers({
    Accept: "application/json",
    ...(init?.body ? { "Content-Type": "application/json" } : {}),
  })

  // Add any custom headers from init
  if (init?.headers) {
    const initHeaders = new Headers(init.headers)
    initHeaders.forEach((value, key) => {
      headers.set(key, value)
    })
  }

  // Attach session token as Authorization header if authenticated
  if (authState.authenticated && authState.sessionId) {
    headers.set("Authorization", authState.sessionId)
  }

  const response = await fetch(
    `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`,
    {
      ...init,
      headers,
    },
  )

  return parseResponse<T>(response)
}
