import {
  useEffect,
  useState,
} from "react";

import {
  getPolicyDiagnostics,
} from "../../../application/policyDecision/diagnostics/policyDiagnostics";

import {
  subscribePolicyState,
} from "../../../application/policyDecision/state/policyStateStore";

export function PolicyWorkbenchHeader() {
  const [
    diagnostics,
    setDiagnostics,
  ] = useState(
    getPolicyDiagnostics(),
  );

  useEffect(
    () =>
      subscribePolicyState(
        () =>
          setDiagnostics(
            getPolicyDiagnostics(),
          ),
      ),
    [],
  );

  return (
    <section className="rounded-xl border border-slate-700/60 bg-slate-950/60 p-5">
      <div className="text-xs uppercase tracking-[0.18em] text-blue-300/70">
        Global policy fabric
      </div>

      <div className="mt-2 text-xl font-semibold text-slate-100">
        Policy / Decision Workbench
      </div>

      <div className="mt-1 text-sm text-slate-500">
        Authorization, risk, state guards, and final decision composition.
      </div>

      <div className="mt-4 grid gap-2 text-xs text-slate-400 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          Policies:{" "}
          {diagnostics.policyCount}
        </div>

        <div>
          Guards:{" "}
          {diagnostics.guardCount}
        </div>

        <div>
          Decisions:{" "}
          {diagnostics.decisionCount}
        </div>

        <div>
          Allowed:{" "}
          {diagnostics.allowedCount}
        </div>

        <div>
          Blocked/denied:{" "}
          {diagnostics.deniedCount}
        </div>
      </div>
    </section>
  );
}
