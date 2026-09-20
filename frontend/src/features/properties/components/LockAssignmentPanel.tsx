import { useState, useEffect } from "react"
import type { UnitRecord } from "../types/unit"
import type { LockAssignment, AssignLockRequest } from "../types/assignment"
import { AssignmentApiService } from "../services/assignmentApiService"

interface LockAssignmentPanelProps {
  unit: UnitRecord
  onClose: () => void
  onAssignmentUpdated: () => void
}

export function LockAssignmentPanel({
  unit,
  onClose,
  onAssignmentUpdated,
}: LockAssignmentPanelProps) {
  const [assignments, setAssignments] = useState<LockAssignment[]>([])
  const [loading, setLoading] = useState(true)
  const [showAssignForm, setShowAssignForm] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const assignmentApiService = new AssignmentApiService()

  const loadAssignments = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await assignmentApiService.getUnitAssignments(unit.id)
      setAssignments(data)
    } catch (err) {
      console.error("Failed to load assignments:", err)
      setError("Failed to load lock assignments")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAssignments()
  }, [unit.id])

  const handleAssign = async (request: AssignLockRequest) => {
    try {
      await assignmentApiService.assignLock(request)
      setShowAssignForm(false)
      await loadAssignments()
      onAssignmentUpdated()
    } catch (err) {
      console.error("Failed to assign lock:", err)
      throw err
    }
  }

  const handleUnassign = async (lockId: string) => {
    try {
      await assignmentApiService.unassignLock({ lock_id: lockId })
      await loadAssignments()
      onAssignmentUpdated()
    } catch (err) {
      console.error("Failed to unassign lock:", err)
      throw err
    }
  }

  const activeAssignment = assignments.find(a => a.status === "active")

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-kiri-800 p-6">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">Lock Assignment</h3>
            <p className="mt-1 text-sm text-kiri-text-muted">
              Unit {unit.unit_number}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-kiri-text transition hover:bg-white/5"
          >
            Close
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8 text-kiri-text-muted">Loading assignments...</div>
        ) : activeAssignment ? (
          <div className="rounded-lg border border-white/10 bg-kiri-900 p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-white">Lock Assigned</div>
                <div className="mt-1 text-xs text-kiri-text-muted">
                  Lock ID: {activeAssignment.lock_id}
                </div>
                <div className="mt-1 text-xs text-kiri-text-muted">
                  Assigned: {new Date(activeAssignment.assigned_at).toLocaleString()}
                </div>
                {activeAssignment.notes && (
                  <div className="mt-1 text-xs text-kiri-text-muted">
                    Notes: {activeAssignment.notes}
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => handleUnassign(activeAssignment.lock_id)}
                className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/20"
              >
                Unassign
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 px-5 py-10 text-center">
            <div className="text-sm font-semibold text-kiri-text-soft">
              No lock assigned
            </div>
            <div className="mt-1 text-xs text-kiri-text-muted">
              Assign a lock to this unit to enable smart access.
            </div>
          </div>
        )}

        {!activeAssignment && (
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setShowAssignForm(true)}
              className="w-full rounded-lg bg-kiri-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-kiri-blue-600"
            >
              Assign Lock
            </button>
          </div>
        )}

        {showAssignForm && (
          <AssignLockForm
            unitId={unit.id}
            onClose={() => setShowAssignForm(false)}
            onSubmit={handleAssign}
          />
        )}
      </div>
    </div>
  )
}

interface AssignLockFormProps {
  unitId: string
  onClose: () => void
  onSubmit: (request: AssignLockRequest) => Promise<void>
}

function AssignLockForm({ unitId, onClose, onSubmit }: AssignLockFormProps) {
  const [lockId, setLockId] = useState("")
  const [notes, setNotes] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!lockId) {
      setError("Lock ID is required")
      return
    }

    try {
      setSubmitting(true)
      await onSubmit({ lock_id: lockId, unit_id: unitId, notes })
    } catch (err) {
      setError("Failed to assign lock. Please try again.")
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-kiri-800 p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white">Assign Lock</h3>
          <p className="mt-1 text-sm text-kiri-text-muted">
            Enter the lock ID to assign to this unit
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="lock_id" className="block text-sm font-medium text-kiri-text">
              Lock ID <span className="text-red-400">*</span>
            </label>
            <input
              id="lock_id"
              type="text"
              required
              value={lockId}
              onChange={(e) => setLockId(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/10 bg-kiri-900 px-3 py-2 text-sm text-white focus:border-kiri-blue-500 focus:outline-none"
              placeholder="Enter lock ID"
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-kiri-text">
              Notes
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="mt-1 w-full rounded-lg border border-white/10 bg-kiri-900 px-3 py-2 text-sm text-white focus:border-kiri-blue-500 focus:outline-none"
              placeholder="Optional notes..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-kiri-text transition hover:bg-white/5 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-kiri-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-kiri-blue-600 disabled:opacity-50"
            >
              {submitting ? "Assigning..." : "Assign Lock"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
