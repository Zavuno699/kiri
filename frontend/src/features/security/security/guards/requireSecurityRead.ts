import {
  requireCapability,
} from "../../../application/security/guards/requireCapability";

export function requireSecurityRead(): void {
  requireCapability(
    "security.read",
  );
}
