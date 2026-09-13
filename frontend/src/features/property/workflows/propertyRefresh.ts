export type PropertyRefreshStep =
  | "select"
  | "load"
  | "project"
  | "complete"

export interface PropertyRefreshState {
  step: PropertyRefreshStep
  propertyId?: string
}
