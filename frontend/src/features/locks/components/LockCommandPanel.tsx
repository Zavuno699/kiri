import { useState } from "react"
import type { LockRecord } from "../types/lock"

interface LockCommandPanelProps {
  lock: LockRecord
  onCommand: (command: "lock" | "unlock" | "revoke_access" | "freeze", reason: string) => Promise<void>
}

export function LockCommandPanel({
  lock,
  onCommand,
}: LockCommandPanelProps) {
  const [reason, setReason] = useState("")
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState("")

  const blocked =
    lock.readiness === "blocked" ||
    lock.readiness === "unknown"

  async function submit(
    command: "lock" | "unlock" | "revoke_access" | "freeze",
  ) {
    if (blocked || !reason.trim() || busy) {
      return
    }

    setBusy(true)
    setNotice("")

    try {
      await onCommand(command, reason.trim())
      setNotice("Command accepted by the API boundary.")
    } catch {
      setNotice(
        "Command was not accepted. Physical state was not assumed to have changed.",
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="kiri-panel rounded-3xl p-6">
      <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-kiri-red">
        Physical access control
      </div>

      <h3 className="mt-2 text-lg font-black">
        Guarded command surface
      </h3>

      <p className="mt-2 text-xs leading-5 text-kiri-text-muted">
        Commands remain fail-closed. The interface never treats a submitted
        command as physical success until the backend confirms the result.
      </p>

      <label className="mt-5 block">
        <span className="text-[10px] font-bold uppercase tracking-[0.13em] text-kiri-text-muted">
          Reason
        </span>

        <textarea
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          placeholder="Enter an operational reason..."
          rows={3}
          className="mt-2 w-full rounded-xl border border-white/8 bg-kiri-950/80 px-3 py-3 text-sm text-kiri-text outline-none transition placeholder:text-kiri-text-muted focus:border-kiri-blue-500/50"
        />
      </label>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          disabled={blocked || busy || !reason.trim()}
          onClick={() => void submit("lock")}
          className="rounded-xl border border-kiri-blue-500/25 bg-kiri-blue-500/10 px-4 py-3 text-xs font-bold text-kiri-blue-400 transition hover:bg-kiri-blue-500/15 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Lock
        </button>

        <button
          type="button"
          disabled={blocked || busy || !reason.trim()}
          onClick={() => void submit("unlock")}
          className="rounded-xl border border-kiri-amber/25 bg-kiri-amber/[0.07] px-4 py-3 text-xs font-bold text-kiri-amber transition hover:bg-kiri-amber/[0.11] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Unlock
        </button>

        <button
          type="button"
          disabled={blocked || busy || !reason.trim()}
          onClick={() => void submit("revoke_access")}
          className="rounded-xl border border-kiri-red/25 bg-kiri-red/[0.07] px-4 py-3 text-xs font-bold text-kiri-red transition hover:bg-kiri-red/[0.11] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Revoke access
        </button>

        <button
          type="button"
          disabled={blocked || busy || !reason.trim()}
          onClick={() => void submit("freeze")}
          className="rounded-xl border border-kiri-purple/25 bg-kiri-purple/[0.07] px-4 py-3 text-xs font-bold text-kiri-purple transition hover:bg-kiri-purple/[0.11] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Freeze
        </button>
      </div>

      {blocked ? (
        <div className="mt-4 rounded-xl border border-kiri-red/15 bg-kiri-red/[0.04] px-4 py-3 text-xs text-kiri-text-soft">
          Commands are disabled because this lock is not in a verified
          command-ready state.
        </div>
      ) : null}

      {notice ? (
        <div className="mt-4 rounded-xl border border-white/7 bg-kiri-900/70 px-4 py-3 text-xs text-kiri-text-soft">
          {notice}
        </div>
      ) : null}
    </section>
  )
}
