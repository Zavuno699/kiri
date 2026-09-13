export function RuntimeOperationProgress({
  value,
}: {
  value: number
}) {
  const normalized = Math.max(
    0,
    Math.min(100, value),
  )

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] text-kiri-text-muted">
        <span>Progress</span>
        <span>{normalized}%</span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-kiri-blue-500 transition-all"
          style={{
            width: `${normalized}%`,
          }}
        />
      </div>
    </div>
  )
}
