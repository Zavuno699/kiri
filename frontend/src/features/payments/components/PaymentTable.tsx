import type { PaymentRecord } from "../types/payment"
import {
  formatDateTime,
  formatUGX,
} from "./paymentFormatting"
import {
  PaymentStatus,
  ReconciliationStatus,
} from "./PaymentStatus"

interface PaymentTableProps {
  payments: PaymentRecord[]
  onSelect?: (payment: PaymentRecord) => void
}

export function PaymentTable({
  payments,
  onSelect,
}: PaymentTableProps) {
  if (payments.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 px-5 py-10 text-center">
        <div className="text-sm font-semibold text-kiri-text-soft">
          No payment records available
        </div>

        <div className="mt-1 text-xs text-kiri-text-muted">
          Payment activity will appear when the billing API is connected.
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/7">
      <table className="w-full min-w-[1100px] border-collapse text-left">
        <thead className="bg-kiri-900">
          <tr className="border-b border-white/7">
            {[
              "Reference",
              "Tenant",
              "Amount",
              "Status",
              "Reconciliation",
              "Provider",
              "Created",
              "",
            ].map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-kiri-text-muted"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {payments.map((payment) => (
            <tr
              key={payment.id}
              className="border-b border-white/5 last:border-b-0"
            >
              <td className="px-4 py-4">
                <div className="font-mono text-[11px] text-kiri-blue-400">
                  {payment.reference}
                </div>

                <div className="mt-1 font-mono text-[10px] text-kiri-text-muted">
                  {payment.id}
                </div>
              </td>

              <td className="px-4 py-4 text-xs text-kiri-text-soft">
                {payment.tenantId}
              </td>

              <td className="px-4 py-4 text-sm font-bold text-kiri-text">
                {formatUGX(payment.amountUGX, payment.currency)}
              </td>

              <td className="px-4 py-4">
                <PaymentStatus status={payment.status} />
              </td>

              <td className="px-4 py-4">
                <ReconciliationStatus
                  status={payment.reconciliationStatus}
                />
              </td>

              <td className="px-4 py-4 text-xs text-kiri-text-soft">
                {payment.provider ?? "—"}
              </td>

              <td className="px-4 py-4 text-xs text-kiri-text-muted">
                {formatDateTime(payment.createdAt)}
              </td>

              <td className="px-4 py-4 text-right">
                <button
                  type="button"
                  onClick={() => onSelect?.(payment)}
                  className="rounded-lg border border-white/8 px-3 py-2 text-xs font-semibold text-kiri-text-soft transition hover:border-kiri-blue-500/30 hover:text-kiri-blue-400"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
