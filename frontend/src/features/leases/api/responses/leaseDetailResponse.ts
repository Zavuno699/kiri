import type { LeaseApiRecord } from "../../contracts/leaseApiRecord"

export interface LeaseDetailResponse {
  data: LeaseApiRecord
  correlationId?: string
}
