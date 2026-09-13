export interface ActionWorkflowResult {
  success: boolean
  state:
    | "completed"
    | "failed"
    | "blocked"
  progress: number
  message?: string
}
