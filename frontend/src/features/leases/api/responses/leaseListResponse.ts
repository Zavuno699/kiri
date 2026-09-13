import type { LeaseApiRecord } from "../../contracts/leaseApiRecord"

export interface LeaseListResponse {
  items: LeaseApiRecord[]
  total?: number
  page?: number
  pageSize?: number
}
