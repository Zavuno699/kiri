import { StatusPill } from "../../../components/ui/StatusPill"

export function OperationalDependencyPanel({
  dependencies,
}: {
  dependencies: Array<{
    name: string
    verified: boolean
    detail: string
  }>
}) {
  return (
    <section className="kiri-panel rounded-3xl p-5">
      <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-kiri-blue-400">
        Dependency posture
      </div>

      <div className="mt-4 space-y-2">
        {dependencies.map(
          (dependency) => (
            <div
              key={dependency.name}
              className="flex flex-col justify-between gap-3 rounded-xl border border-white/7 bg-kiri-900/60 p-3 sm:flex-row sm:items-center"
            >
              <div>
                <div className="text-xs font-semibold text-kiri-text">
                  {dependency.name}
                </div>

                <div className="mt-1 text-[10px] text-kiri-text-muted">
                  {dependency.detail}
                </div>
              </div>

              <StatusPill
                label={
                  dependency.verified
                    ? "Verified"
                    : "Unverified"
                }
                tone={
                  dependency.verified
                    ? "success"
                    : "warning"
                }
              />
            </div>
          ),
        )}
      </div>
    </section>
  )
}
