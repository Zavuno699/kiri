export interface OperatorCard {
  id: string
  label: string
  value: string | number
  status?: "normal" | "warning" | "critical"
  detail?: string
}
