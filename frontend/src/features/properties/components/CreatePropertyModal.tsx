import { useState } from "react"
import type { CreatePropertyRequest } from "../types/property"

interface CreatePropertyModalProps {
  onClose: () => void
  onSubmit: (request: CreatePropertyRequest) => Promise<void>
}

export function CreatePropertyModal({
  onClose,
  onSubmit,
}: CreatePropertyModalProps) {
  const [formData, setFormData] = useState<CreatePropertyRequest>({
    property_name: "",
    property_type: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    timezone: "",
    description: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.property_name || !formData.address_line1 || !formData.city || !formData.state || !formData.postal_code) {
      setError("Please fill in all required fields")
      return
    }

    try {
      setSubmitting(true)
      await onSubmit(formData)
    } catch (err) {
      setError("Failed to create property. Please try again.")
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-kiri-800 p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white">Create Property</h3>
          <p className="mt-1 text-sm text-kiri-text-muted">
            Add a new property to your portfolio
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="property_name" className="block text-sm font-medium text-kiri-text">
              Property Name <span className="text-red-400">*</span>
            </label>
            <input
              id="property_name"
              type="text"
              required
              value={formData.property_name}
              onChange={(e) => setFormData({ ...formData, property_name: e.target.value })}
              className="mt-1 w-full rounded-lg border border-white/10 bg-kiri-900 px-3 py-2 text-sm text-white focus:border-kiri-blue-500 focus:outline-none"
              placeholder="e.g., Sunset Apartments"
            />
          </div>

          <div>
            <label htmlFor="property_type" className="block text-sm font-medium text-kiri-text">
              Property Type
            </label>
            <select
              id="property_type"
              value={formData.property_type}
              onChange={(e) => setFormData({ ...formData, property_type: e.target.value })}
              className="mt-1 w-full rounded-lg border border-white/10 bg-kiri-900 px-3 py-2 text-sm text-white focus:border-kiri-blue-500 focus:outline-none"
            >
              <option value="">Select type</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
              <option value="townhouse">Townhouse</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>

          <div>
            <label htmlFor="address_line1" className="block text-sm font-medium text-kiri-text">
              Address Line 1 <span className="text-red-400">*</span>
            </label>
            <input
              id="address_line1"
              type="text"
              required
              value={formData.address_line1}
              onChange={(e) => setFormData({ ...formData, address_line1: e.target.value })}
              className="mt-1 w-full rounded-lg border border-white/10 bg-kiri-900 px-3 py-2 text-sm text-white focus:border-kiri-blue-500 focus:outline-none"
              placeholder="Street address"
            />
          </div>

          <div>
            <label htmlFor="address_line2" className="block text-sm font-medium text-kiri-text">
              Address Line 2
            </label>
            <input
              id="address_line2"
              type="text"
              value={formData.address_line2}
              onChange={(e) => setFormData({ ...formData, address_line2: e.target.value })}
              className="mt-1 w-full rounded-lg border border-white/10 bg-kiri-900 px-3 py-2 text-sm text-white focus:border-kiri-blue-500 focus:outline-none"
              placeholder="Apartment, suite, etc."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-kiri-text">
                City <span className="text-red-400">*</span>
              </label>
              <input
                id="city"
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="mt-1 w-full rounded-lg border border-white/10 bg-kiri-900 px-3 py-2 text-sm text-white focus:border-kiri-blue-500 focus:outline-none"
                placeholder="City"
              />
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-kiri-text">
                State <span className="text-red-400">*</span>
              </label>
              <input
                id="state"
                type="text"
                required
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="mt-1 w-full rounded-lg border border-white/10 bg-kiri-900 px-3 py-2 text-sm text-white focus:border-kiri-blue-500 focus:outline-none"
                placeholder="State"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="postal_code" className="block text-sm font-medium text-kiri-text">
                Postal Code <span className="text-red-400">*</span>
              </label>
              <input
                id="postal_code"
                type="text"
                required
                value={formData.postal_code}
                onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                className="mt-1 w-full rounded-lg border border-white/10 bg-kiri-900 px-3 py-2 text-sm text-white focus:border-kiri-blue-500 focus:outline-none"
                placeholder="Postal code"
              />
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-kiri-text">
                Country
              </label>
              <input
                id="country"
                type="text"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="mt-1 w-full rounded-lg border border-white/10 bg-kiri-900 px-3 py-2 text-sm text-white focus:border-kiri-blue-500 focus:outline-none"
                placeholder="Country"
              />
            </div>
          </div>

          <div>
            <label htmlFor="timezone" className="block text-sm font-medium text-kiri-text">
              Timezone
            </label>
            <input
              id="timezone"
              type="text"
              value={formData.timezone}
              onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
              className="mt-1 w-full rounded-lg border border-white/10 bg-kiri-900 px-3 py-2 text-sm text-white focus:border-kiri-blue-500 focus:outline-none"
              placeholder="e.g., UTC, America/New_York"
            />
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
              placeholder="Property description..."
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
              {submitting ? "Creating..." : "Create Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
