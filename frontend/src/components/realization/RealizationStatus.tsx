export function RealizationStatus({
  phase,
  message,
}: {
  phase:
    | "idle"
    | "loading"
    | "ready"
    | "refreshing"
    | "degraded"
    | "blocked"
    | "error"
  message?: string
}) {
  const label =
    phase === "ready"
      ? "Operational"
      : phase === "loading"
        ? "Loading"
        : phase === "refreshing"
          ? "Refreshing"
          : phase === "blocked"
            ? "Blocked"
            : phase === "degraded"
              ? "Degraded"
              : phase === "error"
                ? "Error"
                : "Idle"

  return (
    <div className="flex items-center gap-2 text-xs">
      <span
        className={[
          "h-2 w-2 rounded-full",
          phase === "ready" && "bg-kiri-green-400",
          phase === "loading" && "bg-kiri-blue-400",
          phase === "refreshing" && "bg-kiri-blue-400",
          phase === "degraded" && "bg-kiri-amber-400",
          phase === "blocked" && "bg-kiri-red-400",
          phase === "error" && "bg-kiri-red-400",
          phase === "idle" && "bg-kiri-text-muted",
        ]
          .filter(Boolean)
          .join(" ")}
      />

      <span className="font-medium text-kiri-text">
        {label}
      </span>

      {message ? (
        <span className="text-kiri-text-muted">
          {message}
        </span>
      ) : null}
    </div>
  )
}
