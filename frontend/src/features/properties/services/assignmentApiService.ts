import { apiFetch } from "../../../api/client"
import type {
  LockAssignment,
  AssignLockRequest,
  UnassignLockRequest,
  ReassignLockRequest,
} from "../types/assignment"

export class AssignmentApiService {
  async getUnitAssignments(unitId: string): Promise<LockAssignment[]> {
    return apiFetch<LockAssignment[]>(`/assignments/unit?unit_id=${unitId}`, undefined, { useIdentityService: true })
  }

  async getLockAssignments(lockId: string): Promise<LockAssignment[]> {
    return apiFetch<LockAssignment[]>(`/assignments/lock?lock_id=${lockId}`, undefined, { useIdentityService: true })
  }

  async assignLock(request: AssignLockRequest): Promise<LockAssignment> {
    return apiFetch<LockAssignment>("/assignments/assign", {
      method: "POST",
      body: JSON.stringify(request),
    }, { useIdentityService: true })
  }

  async unassignLock(request: UnassignLockRequest): Promise<void> {
    return apiFetch<void>("/assignments/unassign", {
      method: "POST",
      body: JSON.stringify(request),
    }, { useIdentityService: true })
  }

  async reassignLock(request: ReassignLockRequest): Promise<LockAssignment> {
    return apiFetch<LockAssignment>("/assignments/reassign", {
      method: "POST",
      body: JSON.stringify(request),
    }, { useIdentityService: true })
  }
}
