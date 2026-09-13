import {
  getPageConvergenceDiagnostics,
} from "../../../application/ui/diagnostics/pageConvergenceDiagnostics";

export function PageConvergencePanel() {
  const pages =
    getPageConvergenceDiagnostics();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Page convergence
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {pages.map(
          (page) => (
            <div
              key={page.domain}
              className="rounded-lg border border-slate-800 p-3"
            >
              <div className="text-xs font-medium text-slate-300">
                {page.domain}
              </div>

              <div className="mt-1 text-[11px] text-slate-500">
                {page.runtimeReady
                  ? "runtime ready"
                  : page.stale
                    ? "stale"
                    : page.error
                      ? "error"
                      : "not loaded"}
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
