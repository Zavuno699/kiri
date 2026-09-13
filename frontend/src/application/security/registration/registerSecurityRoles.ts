
import { registerRole } from "../permissions/roleRegistry";

export function registerSecurityRoles(): void {
  registerRole({
    key: "operator",
    name: "Operator",
    capabilities: [
      "dashboard.read",
      "properties.read",
      "leases.read",
      "payments.read",
      "devices.read",
      "locks.read",
      "security.read",
    ],
  });

  registerRole({
    key: "administrator",
    name: "Administrator",
    capabilities: [
      "dashboard.read",
      "properties.read",
      "properties.write",
      "leases.read",
      "leases.write",
      "payments.read",
      "payments.write",
      "devices.read",
      "devices.command",
      "locks.read",
      "locks.command",
      "security.read",
      "security.review",
      "security.admin",
      "session.manage",
    ],
  });
}

