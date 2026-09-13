import {
  requireCapability,
} from "../../../application/security/guards/requireCapability";

export function requireDashboardRead(): void {
  requireCapability(
    "dashboard.read",
  );
}
