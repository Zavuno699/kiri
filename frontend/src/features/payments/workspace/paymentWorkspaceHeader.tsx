export function PaymentWorkspaceHeader({
  title = "Payments",
}: {
  title?: string
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-black text-kiri-text">
          {title}
        </h1>
        <p className="mt-1 text-xs text-kiri-text-muted">
          Payments operational workspace
        </p>
      </div>
    </header>
  )
}
