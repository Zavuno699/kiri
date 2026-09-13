export function ConfirmDialogSurface({
  title,
  detail,
  disabled = false,
}: {
  title: string
  detail: string
  disabled?: boolean
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-kiri-950 p-5">
      <div className="text-sm font-bold text-kiri-text">
        {title}
      </div>
      <div className="mt-2 text-xs text-kiri-text-muted">
        {detail}
      </div>
      {disabled ? (
        <div className="mt-4 text-xs text-kiri-red-300">
          This operation is currently unavailable.
        </div>
      ) : null}
    </div>
  )
}
