export interface PaymentProviderContract {
  provider: string
  reference?: string
  transactionId?: string
  status: string
  amountUGX?: number
  currency?: string
  occurredAt?: string
}
