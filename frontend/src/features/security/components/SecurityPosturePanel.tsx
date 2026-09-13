import type { SecuritySummary } from "../types/security"
import { SecurityPosturePill } from "./SecurityStatus"

interface SecurityPosturePanelProps {
  summary: SecuritySummary
}

export function SecurityPosturePanel({
  summary,
}: SecurityPosturePanelProps) {
  return (
    <section className="kiri-panel rounded-3xl p-6">
      <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-kiri-blue-400">
        Security posture
      </div>

      <div className="mt-3 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h3 className="text-2xl font-black">
            Access-control state
          </h3>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-kiri-text-muted">
            The security workspace separates verified posture from unverified
            backend availability.
          </p>
        </div>

        <SecurityPosturePill posture={summary.posture} />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[
          [
            "Emergency freeze",
            summary.emergencyFreezeActive ? "ACTIVE" : "INACTIVE",
          ],
          [
            "Active credentials",
            summary.activeCredentials.toLocaleString(),
          ],
          [
            "Revoked credentials",
            summary.revokedCredentials.toLocaleString(),
          ],
          [
            "Restricted access",
            summary.restrictedAccesses.toLocaleString(),
          ],
          [
            "Critical events",
            summary.criticalEvents.toLocaleString(),
          ],
          [
            "Updated",
            summary.updatedAt
              ? new Date(summary.updatedAt).toLocaleString("en-UG")
              : "—",
          ],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-xl border border-white/7 bg-kiri-900/65 p-4"
          >
            <div className="text-[10px] uppercase tracking-[0.13em] text-kiri-text-muted">
              {label}
            </div>

            <div
              className={[
                "mt-2 text-lg font-black",
                label === "Emergency freeze" &&
                summary.emergencyFreezeActive
                  ? "text-kiri-red"
                  : "text-kiri-text",
              ].join(" ")}
            >
              {value}
            </div>
          </div>
        ))}
      </div>

      {summary.emergencyFreezeActive ? (
        <div className="mt-4 rounded-xl border border-kiri-red/20 bg-kiri-red/[0.05] px-4 py-3 text-xs leading-5 text-kiri-text-soft">
          Emergency freeze is active. Credential revocation and temporary
          access-code invalidation must remain state-machine driven.
        </div>
      ) : null}
    </section>
  )
}
