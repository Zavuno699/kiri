import {
  registerGraphNode,
  registerGraphEdge,
} from "./dataGraphStore";

import {
  listRelationships,
} from "../relationships/relationshipStore";

const nodes = [
  {
    id:
      "dashboard",
    domain:
      "dashboard",
    type:
      "dashboard",
    label:
      "Dashboard",
  },
  {
    id:
      "property",
    domain:
      "properties",
    type:
      "property",
    label:
      "Property",
  },
  {
    id:
      "lease",
    domain:
      "leases",
    type:
      "lease",
    label:
      "Lease",
  },
  {
    id:
      "payment",
    domain:
      "payments",
    type:
      "payment",
    label:
      "Payment",
  },
  {
    id:
      "device",
    domain:
      "devices",
    type:
      "device",
    label:
      "Device",
  },
  {
    id:
      "lock",
    domain:
      "locks",
    type:
      "lock",
    label:
      "Lock",
  },
  {
    id:
      "security",
    domain:
      "security",
    type:
      "security-state",
    label:
      "Security",
  },
] as const;

export function buildCanonicalDataGraph(): void {
  for (
    const node of nodes
  ) {
    registerGraphNode({
      ...node,
      selected:
        false,
      healthy:
        true,
    });
  }

  for (
    const relationship of
      listRelationships()
  ) {
    registerGraphEdge({
      id:
        relationship.id,
      sourceId:
        relationship.source.id,
      targetId:
        relationship.target.id,
      relationship:
        relationship.type,
      required:
        relationship.required,
      active:
        relationship.active,
    });
  }
}
