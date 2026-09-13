import { lockCommandPermission } from "./lockCommandPermission";

export function canIssueLockCommands(): boolean {
  const decision = lockCommandPermission();

  return (
    decision.allowed &&
    decision.dangerous &&
    decision.mutating
  );
}
