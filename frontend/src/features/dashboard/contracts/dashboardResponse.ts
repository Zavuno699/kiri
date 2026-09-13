export interface DashboardResponseContract {
  metrics?: Array<{
    key: string
    label: string
    value: string | number
    delta?: string
  }>

  services?: Array<{
    name: string
    status: string
    latencyMs?: number
    detail?: string
  }>

  alerts?: Array<{
    id: string
    severity: string
    title: string
    message: string
    occurredAt: string
  }>
}
