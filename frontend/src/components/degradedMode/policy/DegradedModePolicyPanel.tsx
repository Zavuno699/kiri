import {
  DEGRADED_MODE_POLICIES,
} from "../../../application/degradedMode/policies/degradedModePolicy";

import {
  getDegradedModeState,
} from "../../../application/degradedMode/state/degradedModeStore";

export function DegradedModePolicyPanel() {
  const mode =
    getDegradedModeState().mode;

  const policy =
    DEGRADED_MODE_POLICIES[mode];

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Degraded-mode policy
      </div>

      <div className="mt-3 grid gap-1 text-xs text-slate-400">
        <div>Reads: {String(policy.allowReads)}</div>
        <div>Writes: {String(policy.allowWrites)}</div>
        <div>Commands: {String(policy.allowCommands)}</div>
        <div>
          Security admin:{" "}
          {String(policy.allowSecurityAdmin)}
        </div>
      </div>
    </section>
  );
}
