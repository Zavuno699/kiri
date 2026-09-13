import { StatusPill } from "../components/ui/StatusPill"

interface ModulePageProps {
  title: string
  description: string
}

export function ModulePage({
  title,
  description,
}: ModulePageProps) {
  return (
    <div className="mx-auto max-w-[1500px] space-y-5">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-kiri-blue-400">
            KiriLock domain
          </div>

          <h2 className="mt-2 text-3xl font-black tracking-tight">
            {title}
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-kiri-text-muted">
            {description}
          </p>
        </div>

        <StatusPill label="Foundation" tone="info" />
      </div>

      <section className="grid gap-4 xl:grid-cols-3">
        {[
          ["01", "Operational state"],
          ["02", "Live records"],
          ["03", "Commands & workflows"],
        ].map(([number, label]) => (
          <article
            key={number}
            className="kiri-panel kiri-panel-hover rounded-2xl p-5"
          >
            <div className="font-mono text-[10px] font-bold text-kiri-blue-400">
              {number}
            </div>

            <h3 className="mt-5 text-lg font-bold">{label}</h3>

            <p className="mt-2 text-sm leading-6 text-kiri-text-muted">
              This module boundary is ready for real backend data and
              production workflows.
            </p>
          </article>
        ))}
      </section>
    </div>
  )
}
