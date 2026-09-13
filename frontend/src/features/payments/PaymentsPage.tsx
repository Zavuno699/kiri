import { useEffect, useMemo, useState } from "react"
import { FilterBar } from "../../components/navigation/FilterBar"
import { KpiCard } from "../../components/data-display/KpiCard"
import { StatusPill } from "../../components/ui/StatusPill"
import {
  PaymentDetailPanel,
} from "./components/PaymentDetailPanel"
import {
  PaymentTable,
} from "./components/PaymentTable"
import { listPayments } from "./services/paymentService"
import type { PaymentRecord } from "./types/payment"

export function PaymentsPage() {
  const [payments, setPayments] = useState<PaymentRecord[]>([])
  const [selected, setSelected] =
    useState<PaymentRecord | null>(null)

  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [available, setAvailable] = useState(false)

  useEffect(() => {
    let cancelled = false

    void listPayments()
      .then((records) => {
        if (cancelled) return

        setPayments(records)
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

    if (!term) return payments

    return payments.filter((payment) =>
      [
        payment.id,
        payment.reference,
        payment.tenantId,
        payment.leaseId,
        payment.provider,
        payment.status,
        payment.reconciliationStatus,
      ]
        .join(" ")
        .toLowerCase()
        .includes(term),
    )
  }, [payments, search])

  const settled = payments.filter(
    (payment) => payment.status === "settled",
  )

  const pending = payments.filter(
    (payment) =>
      payment.status === "pending" ||
      payment.status === "processing",
  )

  const failed = payments.filter(
    (payment) =>
      payment.status === "failed" ||
      payment.status === "reversed",
  )

  const settledValue = settled.reduce(
    (sum, payment) => sum + payment.amountUGX,
    0,
  )

  const formatUGX = (value: number) =>
    new Intl.NumberFormat("en-UG", {
      style: "currency",
      currency: "UGX",
      maximumFractionDigits: 0,
    }).format(value)

  return (
    <div className="mx-auto max-w-[1600px] space-y-5">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-kiri-blue-400">
            Financial operations
          </div>

          <h2 className="mt-2 text-3xl font-black tracking-tight">
            Payments
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-kiri-text-muted">
            Payment intake, settlement, reconciliation and lease-linked
            entitlement.
          </p>
        </div>

        <StatusPill
          label={
            available
              ? "Live API"
              : "API awaiting connection"
          }
          tone={available ? "success" : "warning"}
        />
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          eyebrow="Ledger"
          label="Payment records"
          value={payments.length.toLocaleString()}
          footnote="Billing records returned"
          accent="blue"
        />

        <KpiCard
          eyebrow="Settled"
          label="Settled value"
          value={formatUGX(settledValue)}
          footnote="Successful settlement volume"
          accent="green"
        />

        <KpiCard
          eyebrow="Pending"
          label="Pending payments"
          value={pending.length.toLocaleString()}
          footnote="Awaiting completion"
          accent="amber"
        />

        <KpiCard
          eyebrow="Exceptions"
          label="Failed / reversed"
          value={failed.length.toLocaleString()}
          footnote="Requires operational attention"
          accent="red"
        />
      </section>

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search reference, tenant, lease, provider or state..."
        resultLabel={
          loading
            ? "Loading..."
            : `${filtered.length} record${filtered.length === 1 ? "" : "s"}`
        }
      />

      <section className="kiri-panel rounded-3xl p-4 sm:p-6">
        <PaymentTable
          payments={filtered}
          onSelect={setSelected}
        />
      </section>

      {selected ? (
        <PaymentDetailPanel payment={selected} />
      ) : null}
    </div>
  )
}
