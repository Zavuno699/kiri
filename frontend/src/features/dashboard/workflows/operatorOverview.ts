export interface OperatorOverviewState {
  selectedSection:
    | "health"
    | "alerts"
    | "activity"
    | "financial"
    | "physical"
}

export function createOperatorOverviewState():
  OperatorOverviewState {
  return {
    selectedSection: "health",
  }
}
