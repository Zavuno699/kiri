import type { DataflowState } from "../../../application/dataflow/dataflowState"

export interface DashboardDataflow {
  domain: "dashboard"
  state: DataflowState
  updatedAt: string
}
