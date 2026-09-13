import type { SecurityApiRecord } from "../../contracts/securityApiRecord"

export interface SecurityDetailResponse {
  data: SecurityApiRecord
  correlationId?: string
}
