import type {
  QueryContract,
} from "../../../contracts/pagination/query"

export interface PaymentQueryContract
  extends QueryContract {
  tenantId?: string
  leaseId?: string
  status?: string
  reconciliationStatus?: string
  provider?: string
}
