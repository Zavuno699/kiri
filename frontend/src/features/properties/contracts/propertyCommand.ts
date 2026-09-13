export interface PropertyCommandRequest {
  propertyId: string
  command: "refresh" | "reconcile"
  reason: string
}
