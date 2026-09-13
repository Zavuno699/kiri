import {
  getSecurityDiagnostics,
} from "../../../application/security/diagnostics/securityDiagnostics";

export function SecurityRuntimeStatus() {
  const diagnostics =
    getSecurityDiagnostics();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Security runtime
      </div>

      <div className="mt-3 grid gap-2 text-xs text-slate-400 sm:grid-cols-4">
        <div>
          Mode: {diagnostics.mode}
        </div>

        <div>
          Principal:{" "}
          {diagnostics.principal
            ?.active
            ? "active"
            : "inactive"}
        </div>

        <div>
          Session:{" "}
          {diagnostics.session
            ?.active
            ? "active"
            : "inactive"}
        </div>

        <div>
          Freeze:{" "}
          {diagnostics.freeze.frozen
            ? "ACTIVE"
            : "clear"}
        </div>
      </div>
    </section>
  );
}
