import type { PageDataDependency } from "./pageDataDependency"

export interface PageDataDependencyGraph {
  domain: string
  dependencies: PageDataDependency[]
}

export const pageDataDependencyGraph:
  PageDataDependencyGraph[] = [
  {
    domain: "dashboard",
    dependencies: [
      {
        domain: "property",
        required: false,
        available: true,
      },
      {
        domain: "lease",
        required: false,
        available: true,
      },
      {
        domain: "payment",
        required: false,
        available: true,
      },
      {
        domain: "device",
        required: false,
        available: true,
      },
    ],
  },
  {
    domain: "property",
    dependencies: [],
  },
  {
    domain: "lease",
    dependencies: [
      {
        domain: "property",
        required: true,
        available: true,
      },
      {
        domain: "payment",
        required: false,
        available: true,
      },
      {
        domain: "device",
        required: false,
        available: true,
      },
    ],
  },
  {
    domain: "payment",
    dependencies: [
      {
        domain: "lease",
        required: false,
        available: true,
      },
    ],
  },
  {
    domain: "device",
    dependencies: [
      {
        domain: "lease",
        required: false,
        available: true,
      },
    ],
  },
  {
    domain: "lock",
    dependencies: [
      {
        domain: "device",
        required: false,
        available: false,
        reason:
          "Public lock ingress is not verified.",
      },
    ],
  },
  {
    domain: "security",
    dependencies: [
      {
        domain: "lock",
        required: false,
        available: false,
        reason:
          "Public security ingress is not verified.",
      },
    ],
  },
]
