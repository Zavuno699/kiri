interface CommandPanelProps {
  title: string
  description: string
  command: string
  disabled?: boolean
}

export function CommandPanel({
  title,
  description,
  command,
  disabled = true,
}: CommandPanelProps) {
  return (
    <section className="kiri-panel rounded-3xl p-6">
      <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-kiri-blue-400">
        Operational command
      </div>

      <div className="mt-2 text-xl font-bold">
        {title}
      </div>

      <p className="mt-2 text-sm leading-6 text-kiri-text-muted">
        {description}
      </p>

      <button
        type="button"
        disabled={disabled}
        className={[
          "mt-5 w-full rounded-xl border px-4 py-3 text-sm font-semibold",
          disabled
            ? "cursor-not-allowed border-white/7 bg-white/[0.025] text-kiri-text-muted"
            : "border-kiri-blue-500/30 bg-kiri-blue-600/10 text-kiri-blue-400",
        ].join(" ")}
      >
        {command}
      </button>
    </section>
  )
}
