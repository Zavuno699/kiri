
import type { OperatorIdentity } from "./operatorIdentity";

export function operatorPrincipal(
  identity: OperatorIdentity | null | undefined,
): string | null {
  if (!identity?.authenticated || !identity.active) {
    return null;
  }

  return identity.principal || null;
}

