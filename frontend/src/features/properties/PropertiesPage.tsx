import { useEffect, useMemo, useState } from "react"
import { FilterBar } from "../../components/navigation/FilterBar"
import { StatusPill } from "../../components/ui/StatusPill"
import { PropertyApiService } from "./services/propertyApiService"
import type {
  PropertyRecord,
  CreatePropertyRequest,
} from "./types/property"
import { PropertyTable } from "./components/PropertyTable"
import { CreatePropertyModal } from "./components/CreatePropertyModal"
import { PropertyDetailModal } from "./components/PropertyDetailModal"

const propertyApiService = new PropertyApiService()

export function PropertiesPage() {
  const [properties, setProperties] = useState<PropertyRecord[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [available, setAvailable] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<PropertyRecord | null>(null)
  const [error, setError] = useState<string | null>(null)

  const loadProperties = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await propertyApiService.getProperties()
      setProperties(data)
      setAvailable(true)
    } catch (err) {
      console.error("Failed to load properties:", err)
      setError("Failed to load properties")
      setAvailable(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProperties()
  }, [])

  const handleCreateProperty = async (request: CreatePropertyRequest) => {
    try {
      await propertyApiService.createProperty(request)
      setShowCreateModal(false)
      await loadProperties()
    } catch (err) {
      console.error("Failed to create property:", err)
      throw err
    }
  }

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()

    if (!term) return properties

    return properties.filter((property) =>
      [
        property.id,
        property.property_name,
        property.city,
        property.state,
        property.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(term),
    )
  }, [properties, search])

  return (
    <div className="mx-auto max-w-[1600px] space-y-5">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-kiri-blue-400">
            Property portfolio
          </div>

          <h2 className="mt-2 text-3xl font-black tracking-tight">
            Properties
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-kiri-text-muted">
            Manage your rental properties, units, and lock assignments.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <StatusPill
            label={available ? "Live API" : "API awaiting connection"}
            tone={available ? "success" : "warning"}
          />
          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="rounded-lg bg-kiri-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-kiri-blue-600"
          >
            Create Property
          </button>
        </div>
      </div>

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search properties, addresses or status..."
        resultLabel={
          loading
            ? "Loading..."
            : `${filtered.length} record${filtered.length === 1 ? "" : "s"}`
        }
      />

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <section className="kiri-panel rounded-3xl p-4 sm:p-6">
        <PropertyTable
          properties={filtered}
          onSelect={setSelectedProperty}
        />
      </section>

      {showCreateModal && (
        <CreatePropertyModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateProperty}
        />
      )}

      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onPropertyUpdated={loadProperties}
        />
      )}
    </div>
  )
}
