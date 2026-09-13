import {
  getCommandCenterState,
} from "../../../application/commandCenter/state/commandCenterStore";

export function CommandCenterHeader() {
  const state =
    getCommandCenterState();

  return (
    <header className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-800 pb-5">
      <div>
        <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
          KiriLock operations
        </div>

        <h1 className="mt-1 text-2xl font-semibold text-slate-100">
          Global Command Center
        </h1>
      </div>

      <div className="rounded-lg border border-slate-800 px-3 py-2 text-xs text-slate-400">
        State: {state.status}
      </div>
    </header>
  );
}
