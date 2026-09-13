
export const CAPABILITIES = {
  dashboardRead: "dashboard.read",
  propertyRead: "properties.read",
  propertyWrite: "properties.write",
  leaseRead: "leases.read",
  leaseWrite: "leases.write",
  paymentRead: "payments.read",
  paymentWrite: "payments.write",
  deviceRead: "devices.read",
  deviceCommand: "devices.command",
  lockRead: "locks.read",
  lockCommand: "locks.command",
  securityRead: "security.read",
  securityReview: "security.review",
  securityAdmin: "security.admin",
  sessionManage: "session.manage",
} as const;

export type CapabilityKey = 'security.command' | 'security.write' | 'locks.command' | 'locks.write' | 'devices.command' | 'devices.write' | 'payments.command' | 'payments.write' | 'leases.command' | 'leases.write' | 'properties.command' | 'properties.write' | 'dashboard.command' | 'dashboard.write' |
  (typeof CAPABILITIES)[keyof typeof CAPABILITIES];

