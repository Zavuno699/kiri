export interface RuntimeNotificationState {
  total: number
  unread: number
  errors: number
  warnings: number
}

export const initialRuntimeNotificationState:
  RuntimeNotificationState = {
  total: 0,
  unread: 0,
  errors: 0,
  warnings: 0,
}
