import type { LeaseCommandType } from "./leaseCommandTypes"

export interface LeaseCommand {
  type: LeaseCommandType
  leaseId?: string
}

export function createLeaseCommand(
  type: LeaseCommandType,
  leaseId?: string,
): LeaseCommand {
  return {
    type,
    leaseId,
  }
}
