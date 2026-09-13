export interface RealtimeRefreshTarget {
  domain: string;
  resourceKey: string;
  queryType: string;
}

const targets: Record<
  string,
  RealtimeRefreshTarget[]
> = {
  "dashboard.updated": [
    {
      domain: "dashboard",
      resourceKey: "dashboard",
      queryType:
        "dashboard.refresh",
    },
  ],

  "property.updated": [
    {
      domain: "properties",
      resourceKey: "properties",
      queryType:
        "properties.list",
    },
    {
      domain: "dashboard",
      resourceKey: "dashboard",
      queryType:
        "dashboard.refresh",
    },
  ],

  "lease.updated": [
    {
      domain: "leases",
      resourceKey: "leases",
      queryType:
        "leases.list",
    },
    {
      domain: "dashboard",
      resourceKey: "dashboard",
      queryType:
        "dashboard.refresh",
    },
  ],

  "payment.updated": [
    {
      domain: "payments",
      resourceKey: "payments",
      queryType:
        "payments.list",
    },
    {
      domain: "leases",
      resourceKey: "leases",
      queryType:
        "leases.list",
    },
    {
      domain: "dashboard",
      resourceKey: "dashboard",
      queryType:
        "dashboard.refresh",
    },
  ],

  "device.updated": [
    {
      domain: "devices",
      resourceKey: "devices",
      queryType:
        "devices.list",
    },
    {
      domain: "dashboard",
      resourceKey: "dashboard",
      queryType:
        "dashboard.refresh",
    },
  ],

  "lock.updated": [
    {
      domain: "locks",
      resourceKey: "locks",
      queryType:
        "locks.list",
    },
    {
      domain: "dashboard",
      resourceKey: "dashboard",
      queryType:
        "dashboard.refresh",
    },
  ],

  "security.updated": [
    {
      domain: "security",
      resourceKey: "security",
      queryType:
        "security.list",
    },
    {
      domain: "dashboard",
      resourceKey: "dashboard",
      queryType:
        "dashboard.refresh",
    },
  ],
};

export function getRealtimeRefreshRules(
  eventType: string,
): RealtimeRefreshTarget[] {
  return targets[eventType] ?? [];
}
