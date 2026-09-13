import {
  orchestrateGlobalState,
} from "../../application/globalState/runtime/orchestrateGlobalState";

export function GlobalStateControlPanel() {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">
            Global state orchestration
          </div>

          <div className="mt-1 text-xs text-slate-500">
            Workspace, navigation and command-center state
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            orchestrateGlobalState()
          }
          className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-300"
        >
          Synchronize
        </button>
      </div>
    </section>
  );
}
