import type { DataflowState } from "../../../application/dataflow/dataflowState"

export interface SecurityDataflow {
  domain: "security"
  state: DataflowState
  updatedAt: string
}
