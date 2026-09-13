export interface ReconciliationResult {
  state:
    | "matched"
    | "mismatch"
    | "pending"
    | "blocked"
  differences: string[]
  resolved: boolean
}
