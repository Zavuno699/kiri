import type { PaymentRecord } from "../types/payment"
import {
  formatDateTime,
  formatUGX,
} from "./paymentFormatting"
import {
  PaymentStatus,
  ReconciliationStatus,
} from "./PaymentStatus"

interface PaymentDetailPanelProps {
  payment: PaymentRecord
}

export function PaymentDetailPanel({
  payment,
}: PaymentDetailPanelProps) {
  return (
    <section className="kiri-panel rounded-3xl p-6">
      <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-kiri-blue-400">
        Payment record
      </div>

      <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row">
        <div>
          <div className="font-mono text-xs text-kiri-blue-400">
            {payment.reference}
          </div>

          <h3 className="mt-2 text-2xl font-black">
            {formatUGX(payment.amountUGX, payment.currency)}
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          <PaymentStatus status={payment.status} />

          <ReconciliationStatus
            status={payment.reconciliationStatus}
          />
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[
          ["Payment ID", payment.id],
          ["Tenant", payment.tenantId],
          ["Lease", payment.leaseId ?? "—"],
          ["Provider", payment.provider ?? "—"],
          ["Provider reference", payment.providerReference ?? "—"],
          ["Created", formatDateTime(payment.createdAt)],
          ["Settled", formatDateTime(payment.settledAt)],
          ["Idempotency key", payment.idempotencyKey ?? "—"],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-xl border border-white/7 bg-kiri-900/65 p-3"
          >
            <div className="text-[10px] uppercase tracking-[0.13em] text-kiri-text-muted">
              {label}
            </div>

            <div className="mt-1 break-words text-sm text-kiri-text-soft">
              {value}
            </div>
          </div>
        ))}
      </div>

      {payment.failureReason ? (
        <div className="mt-4 rounded-xl border border-kiri-red/20 bg-kiri-red/[0.05] p-4">
          <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-kiri-red">
            Failure reason
          </div>
          <div className="mt-2 text-sm text-kiri-text-soft">
            {payment.failureReason}
          </div>
        </div>
      ) : null}
    </section>
  )
}
