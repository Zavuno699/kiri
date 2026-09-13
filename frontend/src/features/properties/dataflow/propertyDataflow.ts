import type { DataflowState } from "../../../application/dataflow/dataflowState"

export interface PropertyDataflow {
  domain: "properties"
  state: DataflowState
  updatedAt: string
}
