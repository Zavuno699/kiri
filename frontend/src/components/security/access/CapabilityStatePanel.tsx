
import { getSecurityRuntimeState } from "../../../application/security/runtime/securityRuntimeStore";

export function CapabilityStatePanel() {
  const permissions = getSecurityRuntimeState().permissions;

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-900/40 p-4">
      <div className="text-sm font-semibold">Capabilities</div>
      <div className="mt-3 text-xs text-slate-400">
        Total: {permissions?.length ?? 0}
      </div>
    </section>
  );
}

