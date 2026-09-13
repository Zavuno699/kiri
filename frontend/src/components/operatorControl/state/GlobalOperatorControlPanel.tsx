import {
  getGlobalOperatorControlState,
} from "../../../application/operatorControl/state/globalOperatorControlStore";

export function GlobalOperatorControlPanel() {
  const state =
    getGlobalOperatorControlState();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Global operator control
      </div>

      <div className="mt-3 grid gap-2 text-xs text-slate-400 sm:grid-cols-3">
        <div>
          Operator ready:{" "}
          {String(state.operatorReady)}
        </div>
        <div>
          Security ready:{" "}
          {String(state.securityReady)}
        </div>
        <div>
          RBAC ready:{" "}
          {String(state.rbacReady)}
        </div>
        <div>
          Consistency:{" "}
          {state.consistencyScore}
        </div>
        <div>
          Domain health:{" "}
          {state.domainHealthScore}
        </div>
        <div>
          Mode: {state.degradedMode}
        </div>
      </div>

      {state.reasons.length > 0 ? (
        <div className="mt-3 text-[11px] text-amber-200">
          {state.reasons.join(", ")}
        </div>
      ) : null}
    </section>
  );
}
