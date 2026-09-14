import { deviceCommandPermission } from "./deviceCommandPermission";

export function canIssueDeviceCommands(): boolean {
  const decision = deviceCommandPermission();

  return decision.allows();
}
