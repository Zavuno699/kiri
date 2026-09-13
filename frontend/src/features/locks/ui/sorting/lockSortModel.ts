export interface LockSortModel {
  field: string
  direction: "asc" | "desc"
}

export const defaultLockSort:
  LockSortModel = {
  field: "id",
  direction: "asc",
}
