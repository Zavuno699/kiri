import type {
  ApiResourceDefinition,
} from "../contracts/apiResource";

export const CANONICAL_API_RESOURCES:
  ApiResourceDefinition[] = [
    {
      key: "dashboard",
      domain: "dashboard",
      collectionPath:
        "/api/v1/dashboard",
      readCapability:
        "dashboard.read",
      backendVerified: false,
    },

    {
      key: "properties",
      domain: "properties",
      collectionPath:
        "/api/v1/properties",
      detailPath:
        (id) =>
          `/api/v1/properties/${id}`,
      readCapability:
        "properties.read",
      writeCapability:
        "properties.write",
      backendVerified: false,
    },

    {
      key: "leases",
      domain: "leases",
      collectionPath:
        "/api/v1/leases",
      detailPath:
        (id) =>
          `/api/v1/leases/${id}`,
      readCapability:
        "leases.read",
      writeCapability:
        "leases.write",
      backendVerified: false,
    },

    {
      key: "payments",
      domain: "payments",
      collectionPath:
        "/api/v1/payments",
      detailPath:
        (id) =>
          `/api/v1/payments/${id}`,
      readCapability:
        "payments.read",
      writeCapability:
        "payments.write",
      backendVerified: false,
    },

    {
      key: "devices",
      domain: "devices",
      collectionPath:
        "/api/v1/devices/",
      detailPath:
        (id) =>
          `/api/v1/devices/${id}`,
      readCapability:
        "devices.read",
      writeCapability:
        "devices.write",
      commandCapability:
        "devices.command",
      backendVerified: true,
    },

    {
      key: "locks",
      domain: "locks",
      collectionPath:
        "/api/v1/locks",
      detailPath:
        (id) =>
          `/api/v1/locks/${id}`,
      readCapability:
        "locks.read",
      writeCapability:
        "locks.write",
      commandCapability:
        "locks.command",
      backendVerified: false,
    },

    {
      key: "security",
      domain: "security",
      collectionPath:
        "/api/v1/security/events",
      readCapability:
        "security.read",
      writeCapability:
        "security.control",
      backendVerified: false,
    },
  ];
