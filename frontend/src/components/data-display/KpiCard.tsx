interface KpiCardProps {
  eyebrow: string
  label: string
  value: string
  footnote: string
  accent?: "blue" | "green" | "amber" | "red"
}

const accents = {
  blue: "text-kiri-blue-400",
  green: "text-kiri-green",
  amber: "text-kiri-amber",
  red: "text-kiri-red",
}

export function KpiCard({
  eyebrow,
  label,
  value,
  footnote,
  accent = "blue",
}: KpiCardProps) {
  return (
    <article className="kiri-panel kiri-panel-hover relative overflow-hidden rounded-2xl p-5">
      <div
        className={`absolute right-4 top-4 size-20 rounded-full opacity-20 blur-2xl ${accents[accent].replace(
          "text-",
          "bg-",
        )}`}
      />

      <div className={`text-[10px] font-bold uppercase tracking-[0.16em] ${accents[accent]}`}>
        {eyebrow}
      </div>

      <div className="mt-4 text-sm text-kiri-text-soft">
        {label}
      </div>

      <div className="mt-1 text-3xl font-black tracking-tight text-kiri-text">
        {value}
      </div>

      <div className="mt-2 text-xs leading-5 text-kiri-text-muted">
        {footnote}
      </div>
    </article>
  )
}
