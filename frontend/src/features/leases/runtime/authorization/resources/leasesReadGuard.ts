import {
  requireCapability,
} from "../../../../../application/security/guards/requireCapability";

export function requireLeasesResourceRead(): void {
  requireCapability(
    "leases.read",
  );
}
