import type { DataflowState } from "../../../application/dataflow/dataflowState"

export interface LockDataflow {
  domain: "locks"
  state: DataflowState
  updatedAt: string
}
