import type { SecurityApiRecord } from "../../contracts/securityApiRecord"

export interface SecurityListResponse {
  items: SecurityApiRecord[]
  total?: number
  page?: number
  pageSize?: number
}
