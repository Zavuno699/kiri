import { evaluateDevicesRBAC } from "../domainPermission";
import { PermissionNotice } from "../permissions/permissionNotice";

export function RBACPanel() {
  const decision = evaluateDevicesRBAC();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/30 p-4">
      <div className="text-sm font-semibold">
        Devices permissions
      </div>
      <div className="mt-2">
        <PermissionNotice
          allowed={decision.allowed}
          capability="devices.read"
        />
      </div>
    </section>
  );
}
