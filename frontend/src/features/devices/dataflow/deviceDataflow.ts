import type { DataflowState } from "../../../application/dataflow/dataflowState"

export interface DeviceDataflow {
  domain: "devices"
  state: DataflowState
  updatedAt: string
}
