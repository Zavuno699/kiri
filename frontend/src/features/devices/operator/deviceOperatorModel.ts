export interface DeviceOperatorModel {
  id?: string
  title: string
  domain: "devices"
  status: string
  degraded: boolean
  readOnly: boolean
}
