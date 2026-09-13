import { canIssueDeviceCommands } from "./deviceCommandRoleGate";

export function DeviceCommandPermissionPanel() {
  const allowed = canIssueDeviceCommands();

  return (
    <div className="rounded-lg border border-slate-700/50 p-3 text-xs text-slate-400">
      Device commands: {allowed ? "authorized" : "restricted"}
    </div>
  );
}
