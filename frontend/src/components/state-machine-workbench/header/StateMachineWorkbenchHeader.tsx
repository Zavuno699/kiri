import {
  getStateMachineDiagnostics,
} from "../../../application/stateMachine/diagnostics/stateMachineDiagnostics";

export function StateMachineWorkbenchHeader() {
  const diagnostics =
    getStateMachineDiagnostics();

  return (
    <section className="rounded-xl border border-slate-700/60 bg-slate-950/60 p-5">
      <div className="text-xs uppercase tracking-[0.18em] text-blue-300/70">
        Global state machine
      </div>

      <div className="mt-2 text-xl font-semibold text-slate-100">
        Lifecycle / State Workbench
      </div>

      <div className="mt-1 text-sm text-slate-500">
        Canonical lifecycle states, legal transitions, guards, invariants, and history.
      </div>

      <div className="mt-4 grid gap-2 text-xs text-slate-400 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          States:{" "}
          {diagnostics.stateCount}
        </div>

        <div>
          Transitions:{" "}
          {diagnostics.transitionCount}
        </div>

        <div>
          Guards:{" "}
          {diagnostics.guardCount}
        </div>

        <div>
          Invariants:{" "}
          {diagnostics.invariantCount}
        </div>

        <div>
          History:{" "}
          {diagnostics.historyCount}
        </div>
      </div>
    </section>
  );
}
