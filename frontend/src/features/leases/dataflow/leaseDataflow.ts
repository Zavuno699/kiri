import type { DataflowState } from "../../../application/dataflow/dataflowState"

export interface LeaseDataflow {
  domain: "leases"
  state: DataflowState
  updatedAt: string
}
