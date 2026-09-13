import { useEffect, useMemo, useState } from "react"
import { FilterBar } from "../../components/navigation/FilterBar"
import { StatusPill } from "../../components/ui/StatusPill"
import { LeaseTable } from "./components/LeaseTable"
import { LeaseTimeline } from "./components/LeaseTimeline"
import { listLeases } from "./services/leaseService"
import type { LeaseRecord } from "./types/lease"

export function LeasesPage() {
  const [leases, setLeases] = useState<LeaseRecord[]>([])
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<LeaseRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [available, setAvailable] = useState(false)

  useEffect(() => {
    let cancelled = false

    void listLeases()
      .then((records) => {
        if (cancelled) return
        setLeases(records)
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

    if (!term) return leases

    return leases.filter((lease) =>
      [
        lease.id,
        lease.tenantId,
        lease.propertyId,
        lease.propertyName,
        lease.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(term),
    )
  }, [leases, search])

  const timeline = selected
    ? [
        {
          label: "Entitlement begins",
          date: selected.entitlementFrom,
          state: "complete" as const,
        },
        {
          label: "Entitlement expires",
          date: selected.entitlementUntil,
          state:
            selected.status === "active"
              ? ("current" as const)
              : ("complete" as const),
        },
        {
          label: "Grace deadline",
          date: selected.graceUntil,
          state:
            selected.status === "grace_period"
              ? ("current" as const)
              : ("upcoming" as const),
        },
        {
          label: "Compliance deadline",
          date: selected.complianceUntil,
          state:
            selected.status === "locked"
              ? ("current" as const)
              : ("upcoming" as const),
        },
      ]
    : []

  return (
    <div className="mx-auto max-w-[1600px] space-y-5">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-kiri-blue-400">
            Lease control
          </div>

          <h2 className="mt-2 text-3xl font-black tracking-tight">
            Leases
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-kiri-text-muted">
            Entitlement windows, grace periods, compliance and lease lifecycle.
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
        placeholder="Search lease, tenant, property or state..."
        resultLabel={
          loading
            ? "Loading..."
            : `${filtered.length} record${filtered.length === 1 ? "" : "s"}`
        }
      />

      <section className="kiri-panel rounded-3xl p-4 sm:p-6">
        <LeaseTable
          leases={filtered}
          onSelect={setSelected}
        />
      </section>

      {selected ? (
        <section className="grid gap-5 xl:grid-cols-[0.7fr_1.3fr]">
          <div className="kiri-panel rounded-3xl p-6">
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-kiri-blue-400">
              Selected lease
            </div>

            <div className="mt-3 font-mono text-xs text-kiri-blue-400">
              {selected.id}
            </div>

            <h3 className="mt-2 text-2xl font-black">
              {selected.propertyName}
            </h3>

            <div className="mt-4">
              <StatusPill
                label={selected.status.replace("_", " ")}
                tone={
                  selected.status === "active"
                    ? "success"
                    : selected.status === "grace_period"
                      ? "warning"
                      : selected.status === "locked"
                        ? "danger"
                        : "default"
                }
              />
            </div>

            <div className="mt-6 grid gap-3">
              {[
                ["Tenant", selected.tenantId],
                ["Property", selected.propertyId],
                ["Version", `v${selected.version}`],
                ["Updated", new Date(selected.updatedAt).toLocaleString()],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl border border-white/7 bg-kiri-900/65 p-3"
                >
                  <div className="text-[10px] uppercase tracking-[0.13em] text-kiri-text-muted">
                    {label}
                  </div>
                  <div className="mt-1 text-sm text-kiri-text-soft">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="kiri-panel rounded-3xl p-6">
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-kiri-blue-400">
              Entitlement lifecycle
            </div>

            <h3 className="mt-2 text-xl font-bold">
              Lease timeline
            </h3>

            <div className="mt-6">
              <LeaseTimeline items={timeline} />
            </div>
          </div>
        </section>
      ) : null}
    </div>
  )
}
