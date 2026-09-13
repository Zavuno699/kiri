export type ResourceLifecycle =
  | "idle"
  | "loading"
  | "ready"
  | "refreshing"
  | "stale"
  | "error"

export interface ResourceState<T> {
  lifecycle: ResourceLifecycle
  data?: T
  error?: string
  updatedAt?: string
}

export function idleState<T>():
  ResourceState<T> {
  return {
    lifecycle: "idle",
  }
}

export function loadingState<T>(
  current?: T,
): ResourceState<T> {
  return {
    lifecycle:
      current === undefined
        ? "loading"
        : "refreshing",
    data: current,
  }
}

export function readyState<T>(
  data: T,
): ResourceState<T> {
  return {
    lifecycle: "ready",
    data,
    updatedAt:
      new Date().toISOString(),
  }
}

export function errorState<T>(
  error: unknown,
  current?: T,
): ResourceState<T> {
  return {
    lifecycle: "error",
    data: current,
    error:
      error instanceof Error
        ? error.message
        : "Resource operation failed.",
  }
}
