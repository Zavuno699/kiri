import type {
  TimestampContract,
} from "../../../contracts/domain/timestamps"
import type {
  VersionContract,
} from "../../../contracts/domain/version"

export interface LeaseResponseContract
  extends TimestampContract,
    VersionContract {
  id: string
  propertyId: string
  tenantId: string
  status: string
  startDate: string
  endDate: string
}
