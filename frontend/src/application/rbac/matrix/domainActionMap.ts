export interface DomainActionPermission {
  domain: string;
  action: string;
  capability: string;
  dangerous: boolean;
}

export const DOMAIN_ACTION_PERMISSIONS: DomainActionPermission[] = [
  {
    domain: "dashboard",
    action: "view",
    capability: "dashboard.read",
    dangerous: false,
  },
  {
    domain: "properties",
    action: "view",
    capability: "properties.read",
    dangerous: false,
  },
  {
    domain: "properties",
    action: "edit",
    capability: "properties.write",
    dangerous: false,
  },
  {
    domain: "leases",
    action: "view",
    capability: "leases.read",
    dangerous: false,
  },
  {
    domain: "leases",
    action: "edit",
    capability: "leases.write",
    dangerous: false,
  },
  {
    domain: "payments",
    action: "view",
    capability: "payments.read",
    dangerous: false,
  },
  {
    domain: "payments",
    action: "operate",
    capability: "payments.write",
    dangerous: false,
  },
  {
    domain: "devices",
    action: "view",
    capability: "devices.read",
    dangerous: false,
  },
  {
    domain: "devices",
    action: "command",
    capability: "devices.command",
    dangerous: true,
  },
  {
    domain: "locks",
    action: "view",
    capability: "locks.read",
    dangerous: false,
  },
  {
    domain: "locks",
    action: "command",
    capability: "locks.command",
    dangerous: true,
  },
  {
    domain: "security",
    action: "view",
    capability: "security.read",
    dangerous: false,
  },
  {
    domain: "security",
    action: "review",
    capability: "security.review",
    dangerous: false,
  },
  {
    domain: "security",
    action: "admin",
    capability: "security.admin",
    dangerous: true,
  },
  {
    domain: "security",
    action: "session-management",
    capability: "session.manage",
    dangerous: true,
  },
];
