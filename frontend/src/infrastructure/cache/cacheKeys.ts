export const cacheKeys = {
  health: "kirilock:health",
  readiness: "kirilock:readiness",
  dashboard: "kirilock:dashboard",
  properties: "kirilock:properties",
  leases: "kirilock:leases",
  payments: "kirilock:payments",
  device: (id: string) =>
    `kirilock:device:${id}`,
  security: "kirilock:security",
} as const
