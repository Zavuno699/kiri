import { useEffect, useMemo, useState } from "react"
import { FilterBar } from "../../components/navigation/FilterBar"
import { KpiCard } from "../../components/data-display/KpiCard"
import { StatusPill } from "../../components/ui/StatusPill"
import { DeviceDetailPanel } from "./components/DeviceDetailPanel"
import { DeviceTable } from "./components/DeviceTable"
import { listDevices } from "./services/deviceService"
import type { DeviceRecord } from "./types/device"

export function DevicesPage() {
  const [devices, setDevices] = useState<DeviceRecord[]>([])
  const [selected, setSelected] = useState<DeviceRecord | null>(null)
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [available, setAvailable] = useState(false)

  useEffect(() => {
    let cancelled = false

    void listDevices()
      .then((records) => {
        if (cancelled) return
        setDevices(records)
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

    if (!term) return devices

    return devices.filter((device) =>
      [
        device.id,
        device.name,
        device.serialNumber,
        device.propertyId,
        device.lockId,
        device.connectionStatus,
        device.healthStatus,
        device.firmwareVersion,
      ]
        .join(" ")
        .toLowerCase()
        .includes(term),
    )
  }, [devices, search])

  const online = devices.filter(
    (device) => device.connectionStatus === "online",
  ).length

  const degraded = devices.filter(
    (device) => device.connectionStatus === "degraded",
  ).length

  const critical = devices.filter(
    (device) => device.healthStatus === "critical",
  ).length

  return (
    <div className="mx-auto max-w-[1600px] space-y-5">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-kiri-blue-400">
            Cyber-physical operations
          </div>

          <h2 className="mt-2 text-3xl font-black tracking-tight">
            Devices
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-kiri-text-muted">
            Connectivity, health, battery and device-to-property relationships.
          </p>
        </div>

        <StatusPill
          label={available ? "Live API" : "API awaiting connection"}
          tone={available ? "success" : "warning"}
        />
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          eyebrow="Inventory"
          label="Devices"
          value={devices.length.toLocaleString()}
          footnote="Registered device records"
          accent="blue"
        />

        <KpiCard
          eyebrow="Connectivity"
          label="Online"
          value={online.toLocaleString()}
          footnote="Currently reported online"
          accent="green"
        />

        <KpiCard
          eyebrow="Degraded"
          label="Degraded links"
          value={degraded.toLocaleString()}
          footnote="Requires transport attention"
          accent="amber"
        />

        <KpiCard
          eyebrow="Health"
          label="Critical"
          value={critical.toLocaleString()}
          footnote="Requires intervention"
          accent="red"
        />
      </section>

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search device, serial, property, lock, firmware..."
        resultLabel={
          loading
            ? "Loading..."
            : `${filtered.length} device${filtered.length === 1 ? "" : "s"}`
        }
      />

      <section className="kiri-panel rounded-3xl p-4 sm:p-6">
        <DeviceTable
          devices={filtered}
          onSelect={setSelected}
        />
      </section>

      {selected ? (
        <DeviceDetailPanel device={selected} />
      ) : null}
    </div>
  )
}
