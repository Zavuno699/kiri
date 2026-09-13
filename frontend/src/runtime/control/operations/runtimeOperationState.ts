export interface RuntimeOperationState {
  active: number
  completed: number
  failed: number
  blocked: number
}

export const initialRuntimeOperationState:
  RuntimeOperationState = {
  active: 0,
  completed: 0,
  failed: 0,
  blocked: 0,
}
