import type { ContractMetadata } from "../../../types/runtime/contractStatus"

export const lockContract: ContractMetadata = {
  name: "Lock HTTP ingress",
  status: "fail-closed",
  notes:
    "Lock domain exists, but public HTTP ingress is not currently verified.",
}
