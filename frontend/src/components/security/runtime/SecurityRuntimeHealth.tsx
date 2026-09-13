import { collectSecurityDiagnostics } from "../../../application/security/runtime/diagnostics/securityDiagnostics";

export function SecurityRuntimeHealth() {
  const diagnostics = collectSecurityDiagnostics();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-900/40 p-4">
      <div className="text-sm font-semibold">Security runtime health</div>
      <div className="mt-2 text-xs text-slate-400">
        Ready: {String(diagnostics.health.ready)}
      </div>
      {diagnostics.health.reasons.length > 0 ? (
        <div className="mt-2 text-[11px] text-slate-500">
          {diagnostics.health.reasons.join(", ")}
        </div>
      ) : null}
    </section>
  );
}
