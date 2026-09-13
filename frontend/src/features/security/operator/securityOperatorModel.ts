export interface SecurityOperatorModel {
  id?: string
  title: string
  domain: "security"
  status: string
  degraded: boolean
  readOnly: boolean
}
