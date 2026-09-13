export function LockCommandProgress({
  progress,
  state,
}: {
  progress: number
  state: string
}) {
  const normalized = Math.max(
    0,
    Math.min(100, progress),
  )

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] uppercase tracking-wider text-kiri-text-muted">
        <span>{state}</span>
        <span>{normalized}%</span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-kiri-blue-500"
          style={{
            width: `${normalized}%`,
          }}
        />
      </div>
    </div>
  )
}
