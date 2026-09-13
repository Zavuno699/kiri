import { createResourceStore } from "../../../application/stores/resourceStore"
import type { LeaseRecord } from "../types/lease"

export const leaseStore =
  createResourceStore<LeaseRecord>()
