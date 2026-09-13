import type {
  ApplicationService,
} from "../../../application/services/service"
import type {
  PropertyRecord,
} from "../types/property"

export interface PropertyListRequest {
  search?: string
  status?: string
}

export class PropertyListService
  implements
    ApplicationService<
      PropertyListRequest,
      PropertyRecord[]
    >
{
  constructor(
    private readonly load: () => Promise<
      PropertyRecord[]
    >,
  ) {}

  execute(): Promise<PropertyRecord[]> {
    return this.load()
  }
}
