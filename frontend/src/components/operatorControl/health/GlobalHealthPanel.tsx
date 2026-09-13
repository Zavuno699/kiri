import {
  getDomainHealthState,
} from "../../../application/domainHealth/state/domainHealthStore";

export function GlobalHealthPanel() {
  const state =
    getDomainHealthState();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Global domain health
      </div>

      <div className="mt-2 text-xs text-slate-400">
        Overall: {state.overall}
      </div>

      <div className="mt-1 text-xs text-slate-500">
        Score: {state.score}
      </div>
    </section>
  );
}
