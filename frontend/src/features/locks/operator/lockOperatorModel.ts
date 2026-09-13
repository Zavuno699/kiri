export interface LockOperatorModel {
  id?: string
  title: string
  domain: "locks"
  status: string
  degraded: boolean
  readOnly: boolean
}
