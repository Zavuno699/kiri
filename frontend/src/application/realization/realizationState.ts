export type RealizationPhase =
  | "idle"
  | "loading"
  | "ready"
  | "refreshing"
  | "degraded"
  | "blocked"
  | "error"

export interface RealizationState<T> {
  phase: RealizationPhase
  data?: T
  message?: string
  updatedAt?: string
}

export function idleRealization<T>(): RealizationState<T> {
  return {
    phase: "idle",
  }
}
