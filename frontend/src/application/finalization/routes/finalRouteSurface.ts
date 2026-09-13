export type FinalRouteSurface = {
  key: string;
  path: string;
  domain: string;
  enabled: boolean;
  requiresOperator: boolean;
};

export const finalRouteSurface: FinalRouteSurface[] = [
  {
    key: "dashboard",
    path: "/dashboard",
    domain: "dashboard",
    enabled: true,
    requiresOperator: false,
  },
  {
    key: "properties",
    path: "/properties",
    domain: "properties",
    enabled: true,
    requiresOperator: false,
  },
  {
    key: "leases",
    path: "/leases",
    domain: "leases",
    enabled: true,
    requiresOperator: false,
  },
  {
    key: "payments",
    path: "/payments",
    domain: "payments",
    enabled: true,
    requiresOperator: false,
  },
  {
    key: "devices",
    path: "/devices",
    domain: "devices",
    enabled: true,
    requiresOperator: true,
  },
  {
    key: "locks",
    path: "/locks",
    domain: "locks",
    enabled: true,
    requiresOperator: true,
  },
  {
    key: "security",
    path: "/security",
    domain: "security",
    enabled: true,
    requiresOperator: true,
  },
];
