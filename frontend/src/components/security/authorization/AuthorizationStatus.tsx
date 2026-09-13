import {
  getSecuritySnapshot,
} from "../../../application/security/diagnostics/securitySnapshot";

export function AuthorizationStatus() {
  const state =
    getSecuritySnapshot();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Authorization
      </div>

      <div className="mt-2 text-xs text-slate-400">
        {state.principalActive &&
        state.sessionActive
          ? "Authorization context active"
          : "Authorization denied by default"}
      </div>
    </section>
  );
}
