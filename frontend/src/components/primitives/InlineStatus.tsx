export function InlineStatus({
  label,
  active = false,
}: {
  label: string
  active?: boolean
}) {
  return (
    <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-kiri-text-muted">
      <span
        className={[
          "h-1.5 w-1.5 rounded-full",
          active
            ? "bg-kiri-green shadow-[0_0_10px_rgba(37,201,149,.6)]"
            : "bg-kiri-text-muted/50",
        ].join(" ")}
      />
      {label}
    </span>
  )
}
