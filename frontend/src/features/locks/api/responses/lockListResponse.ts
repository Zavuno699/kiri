import type { LockApiRecord } from "../../contracts/lockApiRecord"

export interface LockListResponse {
  items: LockApiRecord[]
  total?: number
  page?: number
  pageSize?: number
}
