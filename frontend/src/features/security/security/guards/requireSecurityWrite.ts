import {
  requireCapability,
} from "../../../../application/security/guards/requireCapability";

export function requireSecurityWrite(): void {
  requireCapability(
    "security.write",
  );
}
