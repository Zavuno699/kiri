export type ResourceLifecycle =
  | "idle"
  | "loading"
  | "ready"
  | "refreshing"
  | "degraded"
  | "failed"

export interface ResourceState<T> {
  lifecycle: ResourceLifecycle
  data?: T
  error?: string
  updatedAt?: string
}

export function idleResource<T>(): ResourceState<T> {
  return {
    lifecycle: "idle",
  }
}
