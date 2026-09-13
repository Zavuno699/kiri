import {
  getPersistenceDiagnostics,
} from "../../../application/persistence/diagnostics/persistenceDiagnostics";

export function PersistenceRuntimePanel() {
  const diagnostics =
    getPersistenceDiagnostics();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Persistence runtime
      </div>

      <div className="mt-3 grid gap-2 text-xs text-slate-400 sm:grid-cols-4">
        <div>
          Policies:{" "}
          {diagnostics.policyCount}
        </div>

        <div>
          Entries:{" "}
          {diagnostics.entryCount}
        </div>

        <div>
          Invalidation rules:{" "}
          {diagnostics.invalidationRuleCount}
        </div>

        <div>
          Operations:{" "}
          {diagnostics.operationCount}
        </div>
      </div>
    </section>
  );
}
