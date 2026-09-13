import { evaluateLocksRBAC } from "../domainPermission";
import { PermissionNotice } from "../permissions/permissionNotice";

export function RBACPanel() {
  const decision = evaluateLocksRBAC();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/30 p-4">
      <div className="text-sm font-semibold">
        Locks permissions
      </div>
      <div className="mt-2">
        <PermissionNotice
          allowed={decision.allowed}
          capability="locks.read"
        />
      </div>
    </section>
  );
}
