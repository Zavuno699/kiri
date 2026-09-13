export interface SecuritySortModel {
  field: string
  direction: "asc" | "desc"
}

export const defaultSecuritySort:
  SecuritySortModel = {
  field: "id",
  direction: "asc",
}
