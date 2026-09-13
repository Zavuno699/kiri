export interface FilterDefinition {
  id: string
  label: string
  type: "text" | "select" | "date" | "boolean"
  options?: string[]
}
