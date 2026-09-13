import { evaluatePropertiesRBAC } from "../domainPermission";
import { PermissionNotice } from "../permissions/permissionNotice";

export function RBACPanel() {
  const decision = evaluatePropertiesRBAC();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/30 p-4">
      <div className="text-sm font-semibold">
        Properties permissions
      </div>
      <div className="mt-2">
        <PermissionNotice
          allowed={decision.allowed}
          capability="properties.read"
        />
      </div>
    </section>
  );
}
