export interface Notification {
  id: string
  level: "info" | "success" | "warning" | "error"
  title: string
  message: string
  domain?: string
  operationId?: string
  createdAt: string
  read: boolean
}
