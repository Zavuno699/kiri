export interface PaymentFilterForm {
  search: string
  status: string
}

export const emptyPaymentFilterForm: PaymentFilterForm = {
  search: "",
  status: "",
}
