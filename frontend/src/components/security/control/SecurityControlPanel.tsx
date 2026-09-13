import {
  getSecuritySnapshot,
} from "../../../application/security/diagnostics/securitySnapshot";

export function SecurityControlPanel() {
  const state =
    getSecuritySnapshot();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Security control
      </div>

      <div className="mt-3 grid gap-2 text-xs text-slate-400 sm:grid-cols-3">
        <div>
          Mode: {state.mode}
        </div>

        <div>
          Recovery:{" "}
          {state.recoveryRequired
            ? "required"
            : "clear"}
        </div>

        <div>
          Credentials:{" "}
          {state.credentialCount}
        </div>
      </div>
    </section>
  );
}
