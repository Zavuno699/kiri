import {
  getRBACState,
} from "../../../application/rbac/state/rbacStore";

export function RoleCapabilitySummary() {
  const state = getRBACState();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Effective operator access
      </div>

      <div className="mt-2 text-xs text-slate-400">
        Roles: {state.roles.join(", ") || "none"}
      </div>

      <div className="mt-1 text-xs text-slate-500">
        Capabilities: {state.effectiveCapabilities.length}
      </div>
    </section>
  );
}
