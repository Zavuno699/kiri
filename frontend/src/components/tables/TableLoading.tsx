export function TableLoading({
  rows = 5,
}: {
  rows?: number
}) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="h-10 animate-pulse rounded-lg bg-white/[0.035]"
        />
      ))}
    </div>
  )
}
