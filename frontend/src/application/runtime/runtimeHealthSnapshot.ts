export interface RuntimeHealthSnapshot {
  api: "available" | "unavailable"
  dashboard: "available" | "unavailable"
  property: "available" | "unavailable"
  lease: "available" | "unavailable"
  payment: "available" | "unavailable"
  device: "available" | "unavailable"
  lock: "available" | "unavailable"
  security: "available" | "unavailable"
  checkedAt: string
}
