export interface SecurityCommandState {
  running: boolean
  lastCommand?: string
  error?: string
}

export const initialSecurityCommandState: SecurityCommandState = {
  running: false,
}
