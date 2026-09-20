import { useState } from "react"
import type { CreateUnitRequest } from "../types/unit"

interface CreateUnitModalProps {
  propertyId: string
  onClose: () => void
  onSubmit: (request: CreateUnitRequest) => Promise<void>
}

export function CreateUnitModal({
  propertyId,
  onClose,
  onSubmit,
}: CreateUnitModalProps) {
  const [formData, setFormData] = useState<CreateUnitRequest>({
    property_id: propertyId,
    unit_number: "",
    unit_type: "",
    floor_number: 0,
    square_feet: 0,
    bedrooms: 0,
    bathrooms: 0,
    description: "",
    amenities: [],
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.unit_number) {
      setError("Unit number is required")
      return
    }

    try {
      setSubmitting(true)
      await onSubmit(formData)
    } catch (err) {
      setError("Failed to create unit. Please try again.")
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-kiri-800 p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white">Add Unit</h3>
          <p className="mt-1 text-sm text-kiri-text-muted">
            Add a new unit to this property
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="unit_number" className="block text-sm font-medium text-kiri-text">
              Unit Number <span className="text-red-400">*</span>
            </label>
            <input
              id="unit_number"
              type="text"
              required
              value={formData.unit_number}
              onChange={(e) => setFormData({ ...formData, unit_number: e.target.value })}
              className="mt-1 w-full rounded-lg border border-white/10 bg-kiri-900 px-3 py-2 text-sm text-white focus:border-kiri-blue-500 focus:outline-none"
              placeholder="e.g., 101, A1, Unit 1"
            />
          </div>

          <div>
            <label htmlFor="unit_type" className="block text-sm font-medium text-kiri-text">
              Unit Type
            </label>
            <select
              id="unit_type"
              value={formData.unit_type}
              onChange={(e) => setFormData({ ...formData, unit_type: e.target.value })}
              className="mt-1 w-full rounded-lg border border-white/10 bg-kiri-900 px-3 py-2 text-sm text-white focus:border-kiri-blue-500 focus:outline-none"
            >
              <option value="">Select type</option>
              <option value="studio">Studio</option>
              <option value="1br">1 Bedroom</option>
              <option value="2br">2 Bedroom</option>
              <option value="3br">3 Bedroom</option>
              <option value="4br">4+ Bedroom</option>
              <option value="penthouse">Penthouse</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="floor_number" className="block text-sm font-medium text-kiri-text">
                Floor Number
              </label>
              <input
                id="floor_number"
                type="number"
                min="0"
                value={formData.floor_number || ""}
                onChange={(e) => setFormData({ ...formData, floor_number: parseInt(e.target.value) || 0 })}
                className="mt-1 w-full rounded-lg border border-white/10 bg-kiri-900 px-3 py-2 text-sm text-white focus:border-kiri-blue-500 focus:outline-none"
                placeholder="0"
              />
            </div>

            <div>
              <label htmlFor="square_feet" className="block text-sm font-medium text-kiri-text">
                Square Feet
              </label>
              <input
                id="square_feet"
                type="number"
                min="0"
                value={formData.square_feet || ""}
                onChange={(e) => setFormData({ ...formData, square_feet: parseInt(e.target.value) || 0 })}
                className="mt-1 w-full rounded-lg border border-white/10 bg-kiri-900 px-3 py-2 text-sm text-white focus:border-kiri-blue-500 focus:outline-none"
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="bedrooms" className="block text-sm font-medium text-kiri-text">
                Bedrooms
              </label>
              <input
                id="bedrooms"
                type="number"
                min="0"
                value={formData.bedrooms || ""}
                onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) || 0 })}
                className="mt-1 w-full rounded-lg border border-white/10 bg-kiri-900 px-3 py-2 text-sm text-white focus:border-kiri-blue-500 focus:outline-none"
                placeholder="0"
              />
            </div>

            <div>
              <label htmlFor="bathrooms" className="block text-sm font-medium text-kiri-text">
                Bathrooms
              </label>
              <input
                id="bathrooms"
                type="number"
                min="0"
                step="0.5"
                value={formData.bathrooms || ""}
                onChange={(e) => setFormData({ ...formData, bathrooms: parseFloat(e.target.value) || 0 })}
                className="mt-1 w-full rounded-lg border border-white/10 bg-kiri-900 px-3 py-2 text-sm text-white focus:border-kiri-blue-500 focus:outline-none"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-kiri-text">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="mt-1 w-full rounded-lg border border-white/10 bg-kiri-900 px-3 py-2 text-sm text-white focus:border-kiri-blue-500 focus:outline-none"
              placeholder="Unit description..."
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
              {submitting ? "Adding..." : "Add Unit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
