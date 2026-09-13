export interface ResourceHandle<T = unknown> {
  key: string
  version: number
  value?: T
  active: boolean
  lifecycle:
    | "idle"
    | "loading"
    | "ready"
    | "failed"
    | "disposed"
}
