export interface DeviceFilterForm {
  search: string
  status: string
}

export const emptyDeviceFilterForm: DeviceFilterForm = {
  search: "",
  status: "",
}
