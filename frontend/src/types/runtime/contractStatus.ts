export type ContractStatus =
  | "verified"
  | "unverified"
  | "fail-closed"
  | "pending"

export interface ContractMetadata {
  name: string
  status: ContractStatus
  endpoint?: string
  notes?: string
}
