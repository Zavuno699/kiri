import type {
  ApplicationService,
} from "../../../application/services/service"
import type {
  LeaseRecord,
} from "../types/lease"

export interface LeaseListRequest {
  search?: string
  status?: string
  propertyId?: string
}

export class LeaseListService
  implements
    ApplicationService<
      LeaseListRequest,
      LeaseRecord[]
    >
{
  constructor(
    private readonly load: () => Promise<
      LeaseRecord[]
    >,
  ) {}

  execute(): Promise<LeaseRecord[]> {
    return this.load()
  }
}
