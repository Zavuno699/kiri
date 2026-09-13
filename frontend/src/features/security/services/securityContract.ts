import type { ContractMetadata } from "../../../types/runtime/contractStatus"

export const securityContract: ContractMetadata = {
  name: "Security HTTP ingress",
  status: "unverified",
  notes:
    "Security UI remains fail-closed until production routes are verified.",
}
