export interface LiveNotification {
  id: string
  level:
    | "info"
    | "success"
    | "warning"
    | "error"
  domain: string
  title: string
  message: string
  read: boolean
  createdAt: string
}
