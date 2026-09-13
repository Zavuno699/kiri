export function EntityStatus({
  label,
  tone = "normal",
}: {
  label: string
  tone?: "normal" | "warning" | "critical"
}) {
  return (
    <span
      className={[
        "rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
        tone === "normal" &&
          "border-kiri-green-500/20 text-kiri-green-300",
        tone === "warning" &&
          "border-kiri-amber-500/20 text-kiri-amber-300",
        tone === "critical" &&
          "border-kiri-red-500/20 text-kiri-red-300",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label}
    </span>
  )
}
