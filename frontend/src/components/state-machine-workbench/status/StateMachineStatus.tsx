import {
  getStateMachineCoverage,
} from "../../../application/stateMachine/diagnostics/stateMachineCoverage";

export function StateMachineStatus() {
  const coverage =
    getStateMachineCoverage();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-xs uppercase tracking-wider text-slate-500">
        State machine status
      </div>

      <div className="mt-3 grid gap-2 text-xs text-slate-400 sm:grid-cols-2 lg:grid-cols-6">
        <div>
          States:{" "}
          {coverage.states}
        </div>

        <div>
          Transitions:{" "}
          {coverage.transitions}
        </div>

        <div>
          Guards:{" "}
          {coverage.guards}
        </div>

        <div>
          Invariants:{" "}
          {coverage.invariants}
        </div>

        <div>
          Entity states:{" "}
          {coverage.entities}
        </div>

        <div>
          Ready:{" "}
          {coverage.ready
            ? "yes"
            : "pending"}
        </div>
      </div>
    </section>
  );
}
