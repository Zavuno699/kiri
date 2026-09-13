import { useEffect, useState } from "react"
import { KpiCard } from "../components/data-display/KpiCard"
import { EventTimeline } from "../components/data-display/EventTimeline"
import { OperationsTable } from "../components/data-display/OperationsTable"
import { ServiceHealthPanel } from "../components/data-display/ServiceHealthPanel"
import { CommandPanel } from "../components/operations/CommandPanel"
import { StatusPill } from "../components/ui/StatusPill"
import {
  getDashboardSnapshot,
} from "../features/dashboard/services/dashboardService"
import {
  dashboardFallback,
} from "../features/dashboard/data/dashboardFallback"
import type {
  DashboardSnapshot,
} from "../features/dashboard/types/dashboard"

const number = (value: number) =>
  new Intl.NumberFormat().format(value)

export function DashboardPage() {
  const [snapshot, setSnapshot] =
    useState<DashboardSnapshot>(dashboardFallback)

  const [loading, setLoading] = useState(true)
  const [apiUnavailable, setApiUnavailable] = useState(false)

  useEffect(() => {
    let cancelled = false

    void getDashboardSnapshot()
      .then((data) => {
        if (cancelled) return
        setSnapshot(data)
        setApiUnavailable(false)
      })
      .catch(() => {
        if (cancelled) return
        setApiUnavailable(true)
      })
      .finally(() => {
        if (cancelled) return
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const summary = snapshot.summary

  const operationRows = [
    {
      id: "LEASE",
      domain: "Lease",
      operation: "Lifecycle",
      state:
        summary.activeLeases > 0
          ? `${number(summary.activeLeases)} active`
          : "No live data",
      owner: "lease-service",
    },
    {
      id: "PAYMENT",
      domain: "Payments",
      operation: "Settlement",
      state:
        summary.paymentsToday > 0
          ? `${number(summary.paymentsToday)} today`
          : "No live data",
      owner: "billing-service",
    },
    {
      id: "LOCK",
      domain: "Locks",
      operation: "Access state",
      state:
        summary.locksTotal > 0
          ? `${number(summary.locksOnline)} / ${number(summary.locksTotal)} online`
          : "No live data",
      owner: "lock-service",
    },
    {
      id: "DEVICE",
      domain: "Devices",
      operation: "Connectivity",
      state:
        summary.locksOnline > 0
          ? "Telemetry active"
          : "Awaiting telemetry",
      owner: "device-service",
    },
  ]

  return (
    <div className="mx-auto max-w-[1600px] space-y-5">
      <section className="kiri-panel relative overflow-hidden rounded-3xl p-6 sm:p-8">
        <div className="absolute -right-24 -top-24 size-96 rounded-full bg-kiri-blue-600/10 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-7 xl:flex-row xl:items-end">
          <div className="max-w-4xl">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-kiri-blue-400">
                Autonomous property infrastructure
              </span>

              <StatusPill
                label={apiUnavailable ? "API awaiting connection" : "Live API connected"}
                tone={apiUnavailable ? "warning" : "success"}
              />
            </div>

            <h2 className="text-3xl font-black tracking-[-0.04em] sm:text-5xl">
              Operational control at a glance.
            </h2>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-kiri-text-soft sm:text-base">
              KiriLock unifies property, lease, payment, lock, device and
              security state into one operational surface.
            </p>
          </div>

          <div className="min-w-[230px] rounded-2xl border border-white/8 bg-kiri-950/55 p-4">
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-kiri-text-muted">
              Data mode
            </div>

            <div className="mt-2 text-lg font-bold">
              {loading ? "Synchronizing" : apiUnavailable ? "Foundation" : "Live"}
            </div>

            <div className="mt-1 text-xs text-kiri-text-muted">
              {apiUnavailable
                ? "Backend endpoint not yet connected"
                : "Dashboard service responding"}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          eyebrow="Portfolio"
          label="Managed properties"
          value={number(summary.properties)}
          footnote="Property inventory"
          accent="blue"
        />

        <KpiCard
          eyebrow="Leasing"
          label="Active leases"
          value={number(summary.activeLeases)}
          footnote="Current lease state"
          accent="green"
        />

        <KpiCard
          eyebrow="Finance"
          label="Payments today"
          value={number(summary.paymentsToday)}
          footnote="Settlement activity"
          accent="amber"
        />

        <KpiCard
          eyebrow="Physical access"
          label="Locks online"
          value={`${number(summary.locksOnline)} / ${number(summary.locksTotal)}`}
          footnote="Live lock connectivity"
          accent="blue"
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <section className="kiri-panel rounded-3xl p-6">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-kiri-blue-400">
                Operational stream
              </div>
              <h3 className="mt-2 text-xl font-bold">
                Recent events
              </h3>
            </div>

            <span className="text-xs text-kiri-text-muted">
              Event-driven backend
            </span>
          </div>

          <div className="mt-5">
            <EventTimeline events={snapshot.recentEvents} />
          </div>
        </section>

        <ServiceHealthPanel health={snapshot.health} />
      </section>

      <section className="kiri-panel rounded-3xl p-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-kiri-blue-400">
              Cross-service operations
            </div>

            <h3 className="mt-2 text-xl font-bold">
              Control-plane activity
            </h3>
          </div>

          <span className="text-xs text-kiri-text-muted">
            Service ownership is explicit
          </span>
        </div>

        <div className="mt-5">
          <OperationsTable rows={operationRows} />
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <CommandPanel
          title="Emergency operations"
          description="Dangerous operational commands will be enabled only when the matching backend command contract and authorization boundary are connected."
          command="Commands locked until backend capability is connected"
        />

        <CommandPanel
          title="Security response"
          description="Security actions remain fail-closed until credential, revocation and alarm workflows are connected to the production API."
          command="Security actions locked"
        />
      </section>
    </div>
  )
}
