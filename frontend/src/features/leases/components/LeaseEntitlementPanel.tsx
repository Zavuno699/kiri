import type { LeaseEntitlement } from "../types/leaseEntitlement"

export function LeaseEntitlementPanel({
  entitlement,
}: {
  entitlement: LeaseEntitlement
}) {
  return (
    <section className="rounded-2xl border border-white/7 bg-kiri-900/60 p-5">
      <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-kiri-blue-400">
        Entitlement
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="text-[10px] text-kiri-text-muted">
            Entitled through
          </div>
          <div className="mt-1 text-sm text-kiri-text-soft">
            {entitlement.entitledThrough ?? "—"}
          </div>
        </div>

        <div>
          <div className="text-[10px] text-kiri-text-muted">
            Grace until
          </div>
          <div className="mt-1 text-sm text-kiri-text-soft">
            {entitlement.graceUntil ?? "—"}
          </div>
        </div>

        <div>
          <div className="text-[10px] text-kiri-text-muted">
            Days remaining
          </div>
          <div className="mt-1 text-sm font-bold text-kiri-text">
            {entitlement.daysRemaining ?? "—"}
          </div>
        </div>

        <div>
          <div className="text-[10px] text-kiri-text-muted">
            Compliance
          </div>
          <div
            className={[
              "mt-1 text-sm font-bold",
              entitlement.compliant
                ? "text-kiri-green"
                : "text-kiri-red",
            ].join(" ")}
          >
            {entitlement.compliant
              ? "Compliant"
              : "Exception"}
          </div>
        </div>
      </div>
    </section>
  )
}
