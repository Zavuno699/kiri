export interface LeaseOperatorModel {
  id?: string
  title: string
  domain: "leases"
  status: string
  degraded: boolean
  readOnly: boolean
}
