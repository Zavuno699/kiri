import type { LockApiRecord } from "../../contracts/lockApiRecord"

export interface LockDetailResponse {
  data: LockApiRecord
  correlationId?: string
}
