export interface FilterContract {
  field: string
  operator:
    | "eq"
    | "neq"
    | "contains"
    | "startsWith"
    | "gt"
    | "gte"
    | "lt"
    | "lte"
    | "in"
  value: unknown
}
