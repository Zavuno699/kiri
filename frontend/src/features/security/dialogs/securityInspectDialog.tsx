export function SecurityInspectDialog({
  open,
  id,
}: {
  open: boolean
  id?: string
}) {
  if (!open) return null

  return (
    <div className="rounded-xl border border-white/10 bg-kiri-950 p-5">
      <div className="text-sm font-bold text-kiri-text">
        Inspect Security
      </div>
      <div className="mt-2 text-xs text-kiri-text-muted">
        {id ?? "No identifier selected"}
      </div>
    </div>
  )
}
