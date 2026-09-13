export interface LeaseCommandState {
  running: boolean
  lastCommand?: string
  error?: string
}

export const initialLeaseCommandState: LeaseCommandState = {
  running: false,
}
