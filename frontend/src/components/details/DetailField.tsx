export function DetailField({
  label,
  value,
}: {
  label: string
  value?: string
}) {
  return (
    <div>
      <div className="text-[9px] font-bold uppercase tracking-[0.12em] text-kiri-text-muted">
        {label}
      </div>
      <div className="mt-1 break-words text-sm text-kiri-text-soft">
        {value ?? "—"}
      </div>
    </div>
  )
}
