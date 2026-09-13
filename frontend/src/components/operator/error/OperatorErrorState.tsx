export function OperatorErrorState({
  title,
  detail,
}: {
  title: string
  detail: string
}) {
  return (
    <div className="rounded-xl border border-kiri-red-500/20 bg-kiri-red-500/5 p-5">
      <div className="text-sm font-semibold text-kiri-red-300">
        {title}
      </div>
      <div className="mt-1 text-xs text-kiri-text-muted">
        {detail}
      </div>
    </div>
  )
}
