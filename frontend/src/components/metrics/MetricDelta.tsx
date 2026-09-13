export function MetricDelta({
  value,
  direction = "flat",
}: {
  value: string
  direction?: "up" | "down" | "flat"
}) {
  const tone =
    direction === "up"
      ? "text-kiri-green"
      : direction === "down"
        ? "text-kiri-red"
        : "text-kiri-text-muted"

  return (
    <span className={tone}>
      {value}
    </span>
  )
}
