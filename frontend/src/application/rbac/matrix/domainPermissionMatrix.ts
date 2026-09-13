export interface DomainPermissionMatrix {
  domain: string;
  read: string;
  write: string | null;
  command: string | null;
  review: string | null;
  admin: string | null;
}

export const DOMAIN_PERMISSION_MATRIX: DomainPermissionMatrix[] = [
  {
    domain: "dashboard",
    read: "dashboard.read",
    write: null,
    command: null,
    review: null,
    admin: null,
  },
  {
    domain: "properties",
    read: "properties.read",
    write: "properties.write",
    command: null,
    review: null,
    admin: null,
  },
  {
    domain: "leases",
    read: "leases.read",
    write: "leases.write",
    command: null,
    review: null,
    admin: null,
  },
  {
    domain: "payments",
    read: "payments.read",
    write: "payments.write",
    command: null,
    review: null,
    admin: null,
  },
  {
    domain: "devices",
    read: "devices.read",
    write: null,
    command: "devices.command",
    review: null,
    admin: null,
  },
  {
    domain: "locks",
    read: "locks.read",
    write: null,
    command: "locks.command",
    review: null,
    admin: null,
  },
  {
    domain: "security",
    read: "security.read",
    write: null,
    command: null,
    review: "security.review",
    admin: "security.admin",
  },
];
