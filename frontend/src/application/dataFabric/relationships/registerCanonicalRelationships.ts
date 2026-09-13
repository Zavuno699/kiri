import {
  registerRelationship,
} from "./relationshipStore";

function ref(
  id: string,
  domain: string,
  type: string,
): {
  id: string;
  domain: string;
  type: string;
  label: null;
} {
  return {
    id,
    domain,
    type,
    label:
      null,
  };
}

const relationships = [
  {
    id:
      "property-contains-lease",
    source:
      ref(
        "property",
        "properties",
        "property",
      ),
    target:
      ref(
        "lease",
        "leases",
        "lease",
      ),
    type:
      "contains" as const,
  },

  {
    id:
      "lease-pays-payment",
    source:
      ref(
        "lease",
        "leases",
        "lease",
      ),
    target:
      ref(
        "payment",
        "payments",
        "payment",
      ),
    type:
      "pays" as const,
  },

  {
    id:
      "lease-authorizes-device",
    source:
      ref(
        "lease",
        "leases",
        "lease",
      ),
    target:
      ref(
        "device",
        "devices",
        "device",
      ),
    type:
      "authorizes" as const,
  },

  {
    id:
      "lease-authorizes-lock",
    source:
      ref(
        "lease",
        "leases",
        "lease",
      ),
    target:
      ref(
        "lock",
        "locks",
        "lock",
      ),
    type:
      "authorizes" as const,
  },

  {
    id:
      "device-controls-lock",
    source:
      ref(
        "device",
        "devices",
        "device",
      ),
    target:
      ref(
        "lock",
        "locks",
        "lock",
      ),
    type:
      "controls" as const,
  },

  {
    id:
      "security-controls-device",
    source:
      ref(
        "security",
        "security",
        "security-state",
      ),
    target:
      ref(
        "device",
        "devices",
        "device",
      ),
    type:
      "controls" as const,
  },

  {
    id:
      "security-controls-lock",
    source:
      ref(
        "security",
        "security",
        "security-state",
      ),
    target:
      ref(
        "lock",
        "locks",
        "lock",
      ),
    type:
      "controls" as const,
  },

  {
    id:
      "dashboard-projects-property",
    source:
      ref(
        "dashboard",
        "dashboard",
        "dashboard",
      ),
    target:
      ref(
        "property",
        "properties",
        "property",
      ),
    type:
      "projects" as const,
  },

  {
    id:
      "dashboard-projects-lease",
    source:
      ref(
        "dashboard",
        "dashboard",
        "dashboard",
      ),
    target:
      ref(
        "lease",
        "leases",
        "lease",
      ),
    type:
      "projects" as const,
  },

  {
    id:
      "dashboard-projects-payment",
    source:
      ref(
        "dashboard",
        "dashboard",
        "dashboard",
      ),
    target:
      ref(
        "payment",
        "payments",
        "payment",
      ),
    type:
      "projects" as const,
  },

  {
    id:
      "dashboard-projects-device",
    source:
      ref(
        "dashboard",
        "dashboard",
        "dashboard",
      ),
    target:
      ref(
        "device",
        "devices",
        "device",
      ),
    type:
      "projects" as const,
  },

  {
    id:
      "dashboard-projects-lock",
    source:
      ref(
        "dashboard",
        "dashboard",
        "dashboard",
      ),
    target:
      ref(
        "lock",
        "locks",
        "lock",
      ),
    type:
      "projects" as const,
  },
];

export function registerCanonicalRelationships(): void {
  for (
    const relationship of
      relationships
  ) {
    registerRelationship({
      ...relationship,
      required:
        true,
      active:
        true,
      createdAt:
        new Date().toISOString(),
    });
  }
}
