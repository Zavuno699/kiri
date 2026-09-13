import { requireReason } from "../../lib/validation/requireReason"

export interface PreparedAccessCommand {
  subjectId: string
  action: "grant" | "restrict" | "revoke" | "freeze"
  reason: string
  propertyId?: string
  leaseId?: string
  lockId?: string
}

export function prepareAccessCommand(
  input: PreparedAccessCommand,
): PreparedAccessCommand {
  return {
    ...input,
    subjectId: input.subjectId.trim(),
    reason: requireReason(input.reason),
  }
}
