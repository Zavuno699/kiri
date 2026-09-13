
import { getSessionState } from "../../../application/security/session/sessionStore";

export function SessionStatePanel() {
  const state = getSessionState();
  const session = state.session;

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-900/40 p-4">
      <div className="text-sm font-semibold">Operator session</div>
      <div className="mt-3 text-xs text-slate-400">
        {session ? session.state : "No active session"}
      </div>
    </section>
  );
}

