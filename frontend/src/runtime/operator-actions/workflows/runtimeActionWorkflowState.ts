export interface RuntimeActionWorkflowState {
  active: number
  completed: number
  failed: number
  blocked: number
}

export const initialRuntimeActionWorkflowState:
  RuntimeActionWorkflowState = {
  active: 0,
  completed: 0,
  failed: 0,
  blocked: 0,
}
