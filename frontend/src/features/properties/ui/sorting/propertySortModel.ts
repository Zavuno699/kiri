export interface PropertySortModel {
  field: string
  direction: "asc" | "desc"
}

export const defaultPropertySort:
  PropertySortModel = {
  field: "id",
  direction: "asc",
}
