import type {
  QueryContract,
} from "../../../contracts/pagination/query"

export interface LeaseQueryContract
  extends QueryContract {
  propertyId?: string
  tenantId?: string
  status?: string
}
