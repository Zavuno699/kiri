import type { DataflowState } from "../../../application/dataflow/dataflowState"

export interface PaymentDataflow {
  domain: "payments"
  state: DataflowState
  updatedAt: string
}
