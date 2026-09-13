export function MetricValue({
  value,
  detail,
}: {
  value: string
  detail?: string
}) {
  return (
    <div>
      <div className="text-2xl font-black text-kiri-text">
        {value}
      </div>
      {detail ? (
        <div className="mt-1 text-[10px] text-kiri-text-muted">
          {detail}
        </div>
      ) : null}
    </div>
  )
}
