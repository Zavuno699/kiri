
import { getSecurityRuntimeState } from "../../application/security/runtime/securityRuntimeStore";

export function SecurityStatePanel() {
  const state = getSecurityRuntimeState();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-900/40 p-4">
      <div className="text-sm font-semibold">Security runtime</div>
      <div className="mt-3 grid gap-2 text-xs text-slate-400">
        <div>Authenticated: {String(state.identity.authenticated)}</div>
        <div>Session active: {String(Boolean(state.session.session))}</div>
        <div>Authorization ready: {String(state.authorizationReady)}</div>
        <div>Operations frozen: {String(state.frozen)}</div>
      </div>
    </section>
  );
}

