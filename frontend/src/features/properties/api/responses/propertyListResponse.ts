import type { PropertyApiRecord } from "../../contracts/propertyApiRecord"

export interface PropertyListResponse {
  items: PropertyApiRecord[]
  total?: number
  page?: number
  pageSize?: number
}
