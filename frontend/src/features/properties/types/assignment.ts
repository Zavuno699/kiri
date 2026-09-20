export type LockAssignmentStatus = "active" | "inactive"

export interface LockAssignment {
  id: string
  lock_id: string
  unit_id: string
  status: LockAssignmentStatus
  assigned_at: string
  deactivated_at?: string
  notes: string
  created_at: string
  updated_at: string
}

export interface AssignLockRequest {
  lock_id: string
  unit_id: string
  notes?: string
}

export interface UnassignLockRequest {
  lock_id: string
  notes?: string
}

export interface ReassignLockRequest {
  lock_id: string
  from_unit_id: string
  to_unit_id: string
  notes?: string
}
