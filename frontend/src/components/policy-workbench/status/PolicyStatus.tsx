import {
  getPolicyCoverage,
} from "../../../application/policyDecision/diagnostics/policyCoverage";

export function PolicyStatus() {
  const coverage =
    getPolicyCoverage();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-xs uppercase tracking-wider text-slate-500">
        Decision fabric status
      </div>

      <div className="mt-3 grid gap-2 text-xs text-slate-400 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          Policies:{" "}
          {coverage.policies}
        </div>

        <div>
          Guards:{" "}
          {coverage.guards}
        </div>

        <div>
          Decisions:{" "}
          {coverage.decisions}
        </div>

        <div>
          Conditional:{" "}
          {coverage.conditional}
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
