export type PropertyReviewStep =
  | "inspect"
  | "occupancy"
  | "leases"
  | "compliance"
  | "complete"

export interface PropertyReviewContext {
  propertyId: string
}

export interface PropertyReviewState {
  step: PropertyReviewStep
  context: PropertyReviewContext
}
