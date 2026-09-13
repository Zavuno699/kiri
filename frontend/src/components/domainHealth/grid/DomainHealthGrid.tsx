import {
  getDomainHealthState,
} from "../../../application/domainHealth/state/domainHealthStore";

export function DomainHealthGrid() {
  const state =
    getDomainHealthState();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Cross-domain health
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {state.domains.map((domain) => (
          <div
            key={domain.domain}
            className="rounded-lg border border-slate-800/60 p-3"
          >
            <div className="text-xs text-slate-300">
              {domain.domain}
            </div>
            <div className="mt-1 text-[11px] text-slate-500">
              {domain.status} · {domain.score}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
