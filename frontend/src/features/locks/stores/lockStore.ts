import { createResourceStore } from "../../../application/stores/resourceStore"
import type { LockRecord } from "../types/lock"

export const lockStore =
  createResourceStore<LockRecord>()
