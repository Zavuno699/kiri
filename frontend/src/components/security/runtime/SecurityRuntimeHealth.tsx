import { getSecurityDiagnostics } from "../../../application/security/runtime/diagnostics/securityDiagnostics";

export function SecurityRuntimeHealth() {
  const diagnostics = getSecurityDiagnostics();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-900/40 p-4">
      <div className="text-sm font-semibold">Security runtime health</div>
      <div className="mt-2 text-xs text-slate-400">
        Ready: {String(diagnostics.authorizationReady)}
      </div>
      <div className="mt-1 text-xs text-slate-500">
        Authenticated: {String(diagnostics.authenticated)}
      </div>
    </section>
  );
}
