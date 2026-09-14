export interface DomainProjectionDependency {
  sourceDomain: string
  sourceProjection: string
  targetDomain: string
  targetProjection: string
  relation: string
  priority: number
  required: boolean
}

export const domainProjectionDependencies:
  DomainProjectionDependency[] = [
    {
      sourceDomain: "properties",
      sourceProjection: "property",
      targetDomain: "dashboard",
      targetProjection: "dashboard",
      relation: "summarizes",
      priority: 10,
      required: true,
    },
    {
      sourceDomain: "leases",
      sourceProjection: "lease",
      targetDomain: "properties",
      targetProjection: "property",
      relation: "aggregates",
      priority: 20,
      required: true,
    },
    {
      sourceDomain: "payments",
      sourceProjection: "payment",
      targetDomain: "leases",
      targetProjection: "lease",
      relation: "aggregates",
      priority: 20,
      required: true,
    },
    {
      sourceDomain: "devices",
      sourceProjection: "device",
      targetDomain: "properties",
      targetProjection: "property",
      relation: "aggregates",
      priority: 30,
      required: false,
    },
    {
      sourceDomain: "locks",
      sourceProjection: "lock",
      targetDomain: "devices",
      targetProjection: "device",
      relation: "guards",
      priority: 40,
      required: true,
    },
    {
      sourceDomain: "security",
      sourceProjection: "security",
      targetDomain: "locks",
      targetProjection: "lock",
      relation: "guards",
      priority: 50,
      required: true,
    },
    {
      sourceDomain: "security",
      sourceProjection: "security",
      targetDomain: "dashboard",
      targetProjection: "dashboard",
      relation: "summarizes",
      priority: 60,
      required: true,
    },
  ];
