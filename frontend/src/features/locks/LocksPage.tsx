import { useEffect, useMemo, useState } from "react"
import { FilterBar } from "../../components/navigation/FilterBar"
import { KpiCard } from "../../components/data-display/KpiCard"
import { StatusPill } from "../../components/ui/StatusPill"
import {
  LockCommandPanel,
} from "./components/LockCommandPanel"
import { LockTable } from "./components/LockTable"
import { listLocks, sendLockCommand } from "./services/lockService"
import type { LockRecord } from "./types/lock"

export function LocksPage() {
  const [locks, setLocks] = useState<LockRecord[]>([])
  const [selected, setSelected] = useState<LockRecord | null>(null)
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [available, setAvailable] = useState(false)

  useEffect(() => {
    let cancelled = false

    void listLocks()
      .then((records) => {
        if (cancelled) return
        setLocks(records)
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

    if (!term) return locks

    return locks.filter((lock) =>
      [
        lock.id,
        lock.name,
        lock.propertyId,
        lock.leaseId,
        lock.deviceId,
        lock.state,
        lock.readiness,
        lock.lastCommand,
      ]
        .join(" ")
        .toLowerCase()
        .includes(term),
    )
  }, [locks, search])

  const locked = locks.filter(
    (lock) => lock.state === "locked",
  ).length

  const unlocked = locks.filter(
    (lock) => lock.state === "unlocked",
  ).length

  const blocked = locks.filter(
    (lock) =>
      lock.readiness === "blocked" ||
      lock.state === "jammed",
  ).length

  async function command(
    commandName: "lock" | "unlock" | "revoke_access" | "freeze",
    reason: string,
  ) {
    if (!selected) {
      throw new Error("No lock selected")
    }

    const result = await sendLockCommand(selected.id, {
      command: commandName,
      reason,
    })

    if (!result.authorized) {
      throw new Error(result.reason || "Command not authorized")
    }
  }

  return (
    <div className="mx-auto max-w-[1600px] space-y-5">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-kiri-blue-400">
            Physical access control
          </div>

          <h2 className="mt-2 text-3xl font-black tracking-tight">
            Locks
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-kiri-text-muted">
            Lock state, readiness, lease association and guarded physical
            command controls.
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
          label="Locks"
          value={locks.length.toLocaleString()}
          footnote="Registered lock records"
          accent="blue"
        />

        <KpiCard
          eyebrow="State"
          label="Locked"
          value={locked.toLocaleString()}
          footnote="Reported secure state"
          accent="green"
        />

        <KpiCard
          eyebrow="State"
          label="Unlocked"
          value={unlocked.toLocaleString()}
          footnote="Open physical state"
          accent="amber"
        />

        <KpiCard
          eyebrow="Exceptions"
          label="Blocked / jammed"
          value={blocked.toLocaleString()}
          footnote="Command readiness requires attention"
          accent="red"
        />
      </section>

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search lock, property, lease, device or state..."
        resultLabel={
          loading
            ? "Loading..."
            : `${filtered.length} lock${filtered.length === 1 ? "" : "s"}`
        }
      />

      <section className="kiri-panel rounded-3xl p-4 sm:p-6">
        <LockTable
          locks={filtered}
          onSelect={setSelected}
        />
      </section>

      {selected ? (
        <LockCommandPanel
          lock={selected}
          onCommand={command}
        />
      ) : (
        <section className="kiri-panel rounded-3xl border border-dashed border-white/8 p-6">
          <div className="text-[10px] font-bold uppercase tracking-[0.17em] text-kiri-text-muted">
            Command surface
          </div>

          <p className="mt-2 text-sm text-kiri-text-soft">
            Select a lock to inspect its guarded physical-access controls.
          </p>
        </section>
      )}
    </div>
  )
}
