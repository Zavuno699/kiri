import {
  requireCapability,
} from "../../../../../application/security/guards/requireCapability";

export function requireLeasesResourceWrite(): void {
  requireCapability(
    "leases.write",
  );
}
