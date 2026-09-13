export interface PaymentOperatorModel {
  id?: string
  title: string
  domain: "payments"
  status: string
  degraded: boolean
  readOnly: boolean
}
