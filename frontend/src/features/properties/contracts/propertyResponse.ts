import type {
  TimestampContract,
} from "../../../contracts/domain/timestamps"

export interface PropertyResponseContract
  extends TimestampContract {
  id: string
  name: string
  status: string
  occupancy?: string
  units?: number
  occupiedUnits?: number
  availableUnits?: number
}
