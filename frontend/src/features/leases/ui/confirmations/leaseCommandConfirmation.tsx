export function LeaseCommandConfirmation({
  required,
  confirmed,
  reason,
}: {
  required: boolean
  confirmed: boolean
  reason?: string
}) {
  return (
    <div className="rounded-lg border border-white/7 bg-kiri-950/50 p-3 text-xs text-kiri-text-muted">
      {confirmed
        ? "Command confirmed."
        : required
          ? "Confirmation required before execution."
          : "Confirmation not required."}

      {reason ? (
        <div className="mt-1 text-[10px]">
          {reason}
        </div>
      ) : null}
    </div>
  )
}
