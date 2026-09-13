import {
  getDependencyDiagnostics,
} from "../../../application/dependencyGraph/diagnostics/dependencyDiagnostics";

export function RuntimeDependencyPanel() {
  const diagnostics =
    getDependencyDiagnostics();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Runtime dependency graph
      </div>

      <div className="mt-3 grid gap-2 text-xs text-slate-400">
        <div>
          Dependencies: {diagnostics.total}
        </div>
        <div>
          Roots: {diagnostics.roots.length}
        </div>
        <div>
          Orphaned: {diagnostics.orphaned.length}
        </div>
        <div>
          Missing references:{" "}
          {diagnostics.missingReferences.length}
        </div>
      </div>
    </section>
  );
}
