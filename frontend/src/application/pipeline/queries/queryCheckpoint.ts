import type { QueryLifecycle } from "./queryLifecycle"

export interface QueryCheckpoint {
  queryId: string
  state: QueryLifecycle
  updatedAt: string
}
