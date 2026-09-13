export type SortDirection =
  | "asc"
  | "desc"

export interface SortContract {
  field: string
  direction: SortDirection
}
