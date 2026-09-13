export type FinalDomainSurface = {
  domain: string;
  sourceRoot: string;
  route: string;
  projection: boolean;
  commands: boolean;
  queries: boolean;
  realtime: boolean;
  security: boolean;
};

export const finalDomainSurface: FinalDomainSurface[] = [
  {
    domain: "dashboard",
    sourceRoot: "src/domain/dashboard",
    route: "/dashboard",
    projection: true,
    commands: true,
    queries: true,
    realtime: true,
    security: true,
  },
  {
    domain: "properties",
    sourceRoot: "src/domain/properties",
    route: "/properties",
    projection: true,
    commands: true,
    queries: true,
    realtime: true,
    security: true,
  },
  {
    domain: "leases",
    sourceRoot: "src/domain/leases",
    route: "/leases",
    projection: true,
    commands: true,
    queries: true,
    realtime: true,
    security: true,
  },
  {
    domain: "payments",
    sourceRoot: "src/domain/payments",
    route: "/payments",
    projection: true,
    commands: true,
    queries: true,
    realtime: true,
    security: true,
  },
  {
    domain: "devices",
    sourceRoot: "src/domain/devices",
    route: "/devices",
    projection: true,
    commands: true,
    queries: true,
    realtime: true,
    security: true,
  },
  {
    domain: "locks",
    sourceRoot: "src/domain/locks",
    route: "/locks",
    projection: true,
    commands: true,
    queries: true,
    realtime: true,
    security: true,
  },
  {
    domain: "security",
    sourceRoot: "src/domain/security",
    route: "/security",
    projection: true,
    commands: true,
    queries: true,
    realtime: true,
    security: true,
  },
];
