import type { PropertyApiRecord } from "../../contracts/propertyApiRecord"

export interface PropertyDetailResponse {
  data: PropertyApiRecord
  correlationId?: string
}
