import { canIssueLockCommands } from "./lockCommandRoleGate";

export function LockCommandPermissionPanel() {
  const allowed = canIssueLockCommands();

  return (
    <div className="rounded-lg border border-slate-700/50 p-3 text-xs text-slate-400">
      Lock commands: {allowed ? "authorized" : "restricted"}
    </div>
  );
}
