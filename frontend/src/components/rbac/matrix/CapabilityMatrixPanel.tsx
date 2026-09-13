import {
  buildCapabilityMatrix,
} from "../../../application/rbac/matrix/capabilityMatrix";

export function CapabilityMatrixPanel() {
  const matrix = buildCapabilityMatrix([
    "viewer",
    "operator",
    "manager",
    "administrator",
    "security-admin",
  ]);

  const granted = matrix.filter((item) => item.allowed).length;

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Capability matrix
      </div>
      <div className="mt-2 text-xs text-slate-400">
        Granted cells: {granted}
      </div>
      <div className="mt-1 text-[11px] text-slate-500">
        Total cells: {matrix.length}
      </div>
    </section>
  );
}
