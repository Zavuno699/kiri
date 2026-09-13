import { apiFetch } from "../../../api/client"
import type {
  LockDetail,
  LockRecord,
} from "../types/lock"

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

/*
 * Intentionally fail-closed until the backend exposes the exact
 * command route and authorization contract.
 */
export async function sendLockCommand(
  _id: string,
  _request: LockCommandRequest,
) {
  throw new Error(
    "Lock command HTTP ingress is not exposed by the current backend composition",
  )
}
