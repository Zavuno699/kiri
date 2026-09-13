import {
  requireCapability,
} from "../../../application/security/guards/requireCapability";

export function requireLeasesWrite(): void {
  requireCapability(
    "leases.write",
  );
}
