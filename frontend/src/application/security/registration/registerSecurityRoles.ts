
import { registerRole } from "../permissions/roleRegistry";

// Register security roles matching authoritative backend roles
export function registerSecurityRoles(): void {
  registerRole({
    key: "operator",
    name: "Operator",
    capabilities: [
      "dashboard.read",
      "properties.read",
      "leases.read",
      "leases.write",
      "payments.read",
      "payments.write",
      "devices.read",
      "devices.command",
      "locks.read",
      "locks.command",
      "security.read",
    ],
  });

  registerRole({
    key: "security_admin",
    name: "Security Administrator",
    capabilities: [
      "dashboard.read",
      "security.read",
      "security.write",
      "security.review",
      "security.admin",
      "session.manage",
      "audit.read",
    ],
  });

  registerRole({
    key: "super_admin",
    name: "Super Administrator",
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
      "security.write",
      "security.review",
      "security.admin",
      "session.manage",
      "audit.read",
      "landlord.verify",
    ],
  });
}

