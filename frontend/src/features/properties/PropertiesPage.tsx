import { useEffect, useMemo, useState } from "react"
import { FilterBar } from "../../components/navigation/FilterBar"
import { StatusPill } from "../../components/ui/StatusPill"
import {
  PropertyListService,
} from "./services/propertyService"
import type {
  PropertyRecord,
} from "./types/property"
import { PropertyTable } from "./components/PropertyTable"

const propertyService = new PropertyListService(
  async () => {
    const response = await fetch("/api/v1/properties")
    if (!response.ok) throw new Error("Failed to fetch properties")
    return response.json() as Promise<PropertyRecord[]>
  },
)

export function PropertiesPage() {
  const [properties, setProperties] = useState<PropertyRecord[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [available, setAvailable] = useState(false)

  useEffect(() => {
    let cancelled = false

    void propertyService.execute()
      .then((records: PropertyRecord[]) => {
        if (cancelled) return
        setProperties(records)
        setAvailable(true)
      })
      .catch(() => {
        if (cancelled) return
        setAvailable(false)
      })
      .finally(() => {
        if (cancelled) return
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()

    if (!term) return properties

    return properties.filter((property) =>
      [
        property.id,
        property.name,
        property.address,
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
            Portfolio inventory, occupancy and lease-linked operational state.
          </p>
        </div>

        <StatusPill
          label={available ? "Live API" : "API awaiting connection"}
          tone={available ? "success" : "warning"}
        />
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

      <section className="kiri-panel rounded-3xl p-4 sm:p-6">
        <PropertyTable properties={filtered} />
      </section>
    </div>
  )
}
