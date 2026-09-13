export const DOMAIN_AUTHORIZATION_MATRIX = {
  dashboard: {
    read: "dashboard.read",
  },

  properties: {
    read: "properties.read",
    write: "properties.write",
  },

  leases: {
    read: "leases.read",
    write: "leases.write",
  },

  payments: {
    read: "payments.read",
    write: "payments.write",
  },

  devices: {
    read: "devices.read",
    write: "devices.write",
    command: "devices.command",
  },

  locks: {
    read: "locks.read",
    write: "locks.write",
    command: "locks.command",
  },

  security: {
    read: "security.read",
    audit: "security.audit.read",
    control: "security.control",
    recovery: "recovery.execute",
  },
} as const;
