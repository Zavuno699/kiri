export interface PaymentSortModel {
  field: string
  direction: "asc" | "desc"
}

export const defaultPaymentSort:
  PaymentSortModel = {
  field: "id",
  direction: "asc",
}
