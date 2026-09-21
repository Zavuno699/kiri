import { apiFetch } from "../../../api/client"
import type {
  LockDetail,
  LockRecord,
} from "../types/lock"
import { sendLockCommand as sendLockCommandCanonical } from "../api/canonical/lockCommandAdapter"

export async function listLocks(): Promise<LockRecord[]> {
  throw new Error(
    "Lock HTTP collection endpoint is not exposed by the current backend composition",
  )
}

export async function getLock(
  id: string,
): Promise<LockDetail> {
  return apiFetch<LockDetail>(`/api/v1/locks/${id}`)
}

export interface LockCommandRequest {
  command: "lock" | "unlock" | "revoke_access" | "freeze"
  reason: string
  correlationId?: string
}

export interface LockCommandResponse {
  authorized: boolean
  reason?: string
  tenancy_id?: string
  unit_id?: string
}

/*
 * Sends lock command to backend via canonical adapter.
 * Backend validates authorization via TenantLockAuthorizer:
 * - Tenant → Active Tenancy → Unit → Assigned Lock → Lock State
 * - Only "lock" and "unlock" operations are currently supported by backend
 * - Returns authorization result; dispatches to device-service if authorized
 */
export async function sendLockCommand(
  lockId: string,
  request: LockCommandRequest,
): Promise<LockCommandResponse> {
  // Map frontend command names to backend operation names
  // Backend only supports "lock" and "unlock" operations
  const operation = request.command === "lock" || request.command === "unlock"
    ? request.command
    : "lock" // Default to lock for unsupported commands (fail-closed by backend if needed)

  return sendLockCommandCanonical<LockCommandResponse>(lockId, operation)
}
