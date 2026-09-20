import { useState, useEffect } from "react"
import type { PropertyRecord } from "../types/property"
import type { UnitRecord, CreateUnitRequest } from "../types/unit"
import { UnitApiService } from "../services/unitApiService"
import { CreateUnitModal } from "./CreateUnitModal"
import { LockAssignmentPanel } from "./LockAssignmentPanel"

interface PropertyDetailModalProps {
  property: PropertyRecord
  onClose: () => void
  onPropertyUpdated?: () => void
}

export function PropertyDetailModal({
  property,
  onClose,
  onPropertyUpdated,
}: PropertyDetailModalProps) {
  const [units, setUnits] = useState<UnitRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateUnit, setShowCreateUnit] = useState(false)
  const [selectedUnit, setSelectedUnit] = useState<UnitRecord | null>(null)
  const [error, setError] = useState<string | null>(null)

  const unitApiService = new UnitApiService()

  const loadUnits = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await unitApiService.getPropertyUnits(property.id)
      setUnits(data)
    } catch (err) {
      console.error("Failed to load units:", err)
      setError("Failed to load units")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUnits()
  }, [property.id])

  const handleCreateUnit = async (request: CreateUnitRequest) => {
    try {
      await unitApiService.createUnit(request)
      setShowCreateUnit(false)
      await loadUnits()
      onPropertyUpdated?.()
    } catch (err) {
      console.error("Failed to create unit:", err)
      throw err
    }
  }

  const formatAddress = () => {
    const parts = [
      property.address_line1,
      property.address_line2,
      property.city,
      property.state,
      property.postal_code,
    ].filter(Boolean)
    return parts.join(", ")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-kiri-800 p-6">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white">{property.property_name}</h3>
            <p className="mt-1 text-sm text-kiri-text-muted">{formatAddress()}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-kiri-text transition hover:bg-white/5"
          >
            Close
          </button>
        </div>

        <div className="mb-6 grid grid-cols-3 gap-4">
          <div className="rounded-lg border border-white/10 bg-kiri-900 p-4">
            <div className="text-xs font-medium text-kiri-text-muted">Total Units</div>
            <div className="mt-1 text-2xl font-bold text-white">{property.total_units}</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-kiri-900 p-4">
            <div className="text-xs font-medium text-kiri-text-muted">Type</div>
            <div className="mt-1 text-2xl font-bold text-white">{property.property_type || "-"}</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-kiri-900 p-4">
            <div className="text-xs font-medium text-kiri-text-muted">Status</div>
            <div className="mt-1 text-2xl font-bold text-white capitalize">{property.status}</div>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h4 className="text-lg font-bold text-white">Units</h4>
          <button
            type="button"
            onClick={() => setShowCreateUnit(true)}
            className="rounded-lg bg-kiri-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-kiri-blue-600"
          >
            Add Unit
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8 text-kiri-text-muted">Loading units...</div>
        ) : units.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 px-5 py-10 text-center">
            <div className="text-sm font-semibold text-kiri-text-soft">
              No units available
            </div>
            <div className="mt-1 text-xs text-kiri-text-muted">
              Add your first unit to get started.
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {units.map((unit) => (
              <div
                key={unit.id}
                className="flex items-center justify-between rounded-lg border border-white/10 bg-kiri-900 p-4"
              >
                <div>
                  <div className="text-sm font-semibold text-white">{unit.unit_number}</div>
                  <div className="mt-1 text-xs text-kiri-text-muted">
                    {unit.unit_type || "No type"} • {unit.bedrooms} bed • {unit.bathrooms} bath
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-white/10 px-2 py-1 text-xs font-medium capitalize text-kiri-text">
                    {unit.lifecycle}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedUnit(unit)}
                    className="rounded-lg border border-white/8 px-3 py-2 text-xs font-semibold text-kiri-text-soft transition hover:border-kiri-blue-500/30 hover:text-kiri-blue-400"
                  >
                    Manage Lock
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showCreateUnit && (
          <CreateUnitModal
            propertyId={property.id}
            onClose={() => setShowCreateUnit(false)}
            onSubmit={handleCreateUnit}
          />
        )}

        {selectedUnit && (
          <LockAssignmentPanel
            unit={selectedUnit}
            onClose={() => setSelectedUnit(null)}
            onAssignmentUpdated={loadUnits}
          />
        )}
      </div>
    </div>
  )
}
