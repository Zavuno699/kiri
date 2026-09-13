export function PageActivationState({
  active,
  label,
  reason,
}: {
  active: boolean
  label: string
  reason?: string
}) {
  return (
    <div className="rounded-lg border border-white/7 px-3 py-2">
      <div className="flex items-center gap-2">
        <span
          className={[
            "h-2 w-2 rounded-full",
            active
              ? "bg-kiri-green-400"
              : "bg-kiri-red-400",
          ].join(" ")}
        />

        <span className="text-xs font-semibold text-kiri-text">
          {label}
        </span>
      </div>

      {reason ? (
        <div className="mt-1 text-[10px] text-kiri-text-muted">
          {reason}
        </div>
      ) : null}
    </div>
  )
}
