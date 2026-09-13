import type { ContractMetadata } from "../../../types/runtime/contractStatus"

export const deviceContract: ContractMetadata = {
  name: "Device HTTP ingress",
  status: "verified",
  endpoint: "/api/v1/devices/{id}",
  notes:
    "Current verified device query requires a concrete device ID.",
}
