export function OperationalStateBanner({
  title,
  detail,
  severity = "info",
}: {
  title: string
  detail?: string
  severity?: "info" | "success" | "warning" | "danger"
}) {
  return (
    <div
      className={[
        "rounded-xl border px-4 py-3 text-sm",
        severity === "info" && "border-kiri-blue-500/20 bg-kiri-blue-500/5",
        severity === "success" && "border-kiri-green-500/20 bg-kiri-green-500/5",
        severity === "warning" && "border-kiri-amber-500/20 bg-kiri-amber-500/5",
        severity === "danger" && "border-kiri-red-500/20 bg-kiri-red-500/5",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="font-semibold text-kiri-text">
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
