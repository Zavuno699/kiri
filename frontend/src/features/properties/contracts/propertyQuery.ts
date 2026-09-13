import type {
  QueryContract,
} from "../../../contracts/pagination/query"

export interface PropertyQueryContract
  extends QueryContract {
  status?: string
  region?: string
  occupancy?: string
}
