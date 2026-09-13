export function DomainWorkspaceHeader({
  eyebrow,
  title,
  detail,
}: {
  eyebrow: string
  title: string
  detail?: string
}) {
  return (
    <div className="mb-6">
      <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-kiri-blue-400">
        {eyebrow}
      </div>

      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-2xl font-black tracking-tight text-kiri-text">
          {title}
        </h1>

        {detail ? (
          <div className="text-xs text-kiri-text-muted">
            {detail}
          </div>
        ) : null}
      </div>
    </div>
  )
}
