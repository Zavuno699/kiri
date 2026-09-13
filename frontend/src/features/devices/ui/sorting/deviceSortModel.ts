export interface DeviceSortModel {
  field: string
  direction: "asc" | "desc"
}

export const defaultDeviceSort:
  DeviceSortModel = {
  field: "id",
  direction: "asc",
}
