export function RealizationEmpty({
  title,
  detail,
}: {
  title: string
  detail?: string
}) {
  return (
    <div className="rounded-xl border border-dashed border-white/10 px-5 py-8 text-center">
      <div className="text-sm font-semibold text-kiri-text">
        {title}
      </div>

      {detail ? (
        <div className="mt-1 text-xs text-kiri-text-muted">
          {detail}
        </div>
      ) : null}
    </div>
  )
}
