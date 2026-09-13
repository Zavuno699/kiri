import { useEffect, useState } from "react"
import { KpiCard } from "../../components/data-display/KpiCard"
import { StatusPill } from "../../components/ui/StatusPill"
import {
  getSecuritySummary,
  listAccessRecords,
  listSecurityCredentials,
  listSecurityEvents,
} from "./services/securityService"
import {
  AccessTable,
} from "./components/AccessTable"
import {
  CredentialTable,
} from "./components/CredentialTable"
import {
  SecurityEventTimeline,
} from "./components/SecurityEventTimeline"
import {
  SecurityPosturePanel,
} from "./components/SecurityPosturePanel"
import type {
  AccessRecord,
  SecurityCredential,
  SecurityEvent,
  SecuritySummary,
} from "./types/security"

const emptySummary: SecuritySummary = {
  posture: "unknown",
  emergencyFreezeActive: false,
  activeCredentials: 0,
  revokedCredentials: 0,
  restrictedAccesses: 0,
  criticalEvents: 0,
}

export function SecurityPage() {
  const [summary, setSummary] = useState(emptySummary)
  const [credentials, setCredentials] = useState<
    SecurityCredential[]
  >([])
  const [accessRecords, setAccessRecords] = useState<
    AccessRecord[]
  >([])
  const [events, setEvents] = useState<SecurityEvent[]>([])
  const [available, setAvailable] = useState(false)

  useEffect(() => {
    let cancelled = false

    void Promise.all([
      getSecuritySummary(),
      listSecurityCredentials(),
      listAccessRecords(),
      listSecurityEvents(),
    ])
      .then(
        ([
          securitySummary,
          securityCredentials,
          securityAccessRecords,
          securityEvents,
        ]) => {
          if (cancelled) return

          setSummary(securitySummary)
          setCredentials(securityCredentials)
          setAccessRecords(securityAccessRecords)
          setEvents(securityEvents)
          setAvailable(true)
        },
      )
      .catch(() => {
        if (cancelled) return

        setAvailable(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="mx-auto max-w-[1600px] space-y-5">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-kiri-blue-400">
            Security operations
          </div>

          <h2 className="mt-2 text-3xl font-black tracking-tight">
            Security & access
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-kiri-text-muted">
            Credential state, physical-access restrictions, emergency freeze
            visibility and security event history.
          </p>
        </div>

        <StatusPill
          label={
            available
              ? "Live security API"
              : "Security API awaiting connection"
          }
          tone={available ? "success" : "warning"}
        />
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          eyebrow="Credentials"
          label="Active"
          value={summary.activeCredentials.toLocaleString()}
          footnote="Currently valid credentials"
          accent="green"
        />

        <KpiCard
          eyebrow="Credentials"
          label="Revoked"
          value={summary.revokedCredentials.toLocaleString()}
          footnote="Invalidated credentials"
          accent="red"
        />

        <KpiCard
          eyebrow="Access"
          label="Restricted"
          value={summary.restrictedAccesses.toLocaleString()}
          footnote="Access relationships under restriction"
          accent="amber"
        />

        <KpiCard
          eyebrow="Events"
          label="Critical"
          value={summary.criticalEvents.toLocaleString()}
          footnote="Security events requiring attention"
          accent="red"
        />
      </section>

      <SecurityPosturePanel summary={summary} />

      <section className="kiri-panel rounded-3xl p-4 sm:p-6">
        <div className="mb-5">
          <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-kiri-blue-400">
            Credential ledger
          </div>

          <h3 className="mt-2 text-lg font-black">
            Credentials
          </h3>
        </div>

        <CredentialTable credentials={credentials} />
      </section>

      <section className="kiri-panel rounded-3xl p-4 sm:p-6">
        <div className="mb-5">
          <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-kiri-blue-400">
            Access ledger
          </div>

          <h3 className="mt-2 text-lg font-black">
            Physical access
          </h3>
        </div>

        <AccessTable records={accessRecords} />
      </section>

      <section className="kiri-panel rounded-3xl p-4 sm:p-6">
        <div className="mb-5">
          <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-kiri-blue-400">
            Audit stream
          </div>

          <h3 className="mt-2 text-lg font-black">
            Security events
          </h3>
        </div>

        <SecurityEventTimeline events={events} />
      </section>
    </div>
  )
}
