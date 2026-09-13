export const securityRoutes = [
  {
    id: "security-overview",
    key: "security",
    path: "/security",
    page: "overview",
    enabled: true,
  },
  {
    id: "security-audit",
    key: "security-audit",
    path: "/security/audit",
    page: "workspace",
    enabled: true,
  },
] as const
