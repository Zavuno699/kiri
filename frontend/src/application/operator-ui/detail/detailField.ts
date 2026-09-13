export interface DetailField {
  id: string
  label: string
  value: string | number
  emphasis?: "normal" | "muted" | "warning" | "critical"
}
