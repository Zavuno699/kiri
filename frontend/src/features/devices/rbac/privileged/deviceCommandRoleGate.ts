import { deviceCommandPermission } from "./deviceCommandPermission";

export function canIssueDeviceCommands(): boolean {
  const decision = deviceCommandPermission();

  return (
    decision.allowed &&
    decision.dangerous &&
    decision.mutating
  );
}
