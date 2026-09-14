import {
  requireCapability,
} from "../../../../application/security/guards/requireCapability";

export function requireLeasesRead(): void {
  requireCapability(
    "leases.read",
  );
}
