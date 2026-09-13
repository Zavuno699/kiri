export interface RuntimeDataflowState {
  processing: boolean
  pending: number
  failed: number
  lastActivityAt?: string
}

export const initialRuntimeDataflowState:
  RuntimeDataflowState = {
  processing: false,
  pending: 0,
  failed: 0,
}
