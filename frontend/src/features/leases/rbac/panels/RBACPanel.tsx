import { evaluateLeasesRBAC } from "../domainPermission";
import { PermissionNotice } from "../permissions/permissionNotice";

export function RBACPanel() {
  const decision = evaluateLeasesRBAC();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/30 p-4">
      <div className="text-sm font-semibold">
        Leases permissions
      </div>
      <div className="mt-2">
        <PermissionNotice
          allowed={decision.allowed}
          capability="leases.read"
        />
      </div>
    </section>
  );
}
