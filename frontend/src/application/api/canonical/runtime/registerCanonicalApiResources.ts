import {
  registerApiResource,
} from "../registry/resourceRegistry";

const resources = [
  {
    key: "dashboard",
    domain: "dashboard",
    basePath: "/api/v1/dashboard",
    operations: [
      "list",
      "get",
      "status",
    ],
  },
  {
    key: "properties",
    domain: "properties",
    basePath: "/api/v1/properties",
    operations: [
      "list",
      "get",
      "create",
      "update",
    ],
  },
  {
    key: "leases",
    domain: "leases",
    basePath: "/api/v1/leases",
    operations: [
      "list",
      "get",
      "create",
      "update",
    ],
  },
  {
    key: "payments",
    domain: "payments",
    basePath: "/api/v1/payments",
    operations: [
      "list",
      "get",
      "create",
      "status",
    ],
  },
  {
    key: "devices",
    domain: "devices",
    basePath: "/api/v1/devices",
    operations: [
      "get",
      "command",
      "status",
    ],
  },
  {
    key: "locks",
    domain: "locks",
    basePath: "/api/v1/locks",
    operations: [
      "get",
      "command",
      "status",
    ],
  },
  {
    key: "security",
    domain: "security",
    basePath: "/api/v1/security",
    operations: [
      "list",
      "get",
      "status",
    ],
  },
];

export function registerCanonicalApiResources(): void {
  for (const resource of resources) {
    registerApiResource(resource);
  }
}
