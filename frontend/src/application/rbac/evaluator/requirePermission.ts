import type { RoleKey } from "../types";
import { evaluateRBACPermission } from "./evaluatePermission";

export function requireRBACPermission(
  roles: RoleKey[],
  capability: string,
): void {
  const decision = evaluateRBACPermission(
    roles,
    capability,
  );

  if (!decision.allowed) {
    throw new Error(decision.reason);
  }
}
