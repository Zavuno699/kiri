export interface LeaseSortModel {
  field: string
  direction: "asc" | "desc"
}

export const defaultLeaseSort:
  LeaseSortModel = {
  field: "id",
  direction: "asc",
}
