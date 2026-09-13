import type { ResourceContract } from "./resourceContract"

export const featureContracts: ResourceContract[] = [
  {
    name: "properties",
    listSupported: true,
    detailSupported: true,
    mutationSupported: false,
    verified: false,
    notes: "Frontend route currently exists; production API contract requires integration verification.",
  },
  {
    name: "leases",
    listSupported: true,
    detailSupported: true,
    mutationSupported: false,
    verified: false,
    notes: "Frontend route currently exists; production API contract requires integration verification.",
  },
  {
    name: "payments",
    listSupported: true,
    detailSupported: true,
    mutationSupported: false,
    verified: false,
    notes: "Frontend route currently exists; billing integration remains backend-authoritative.",
  },
  {
    name: "devices",
    listSupported: false,
    detailSupported: true,
    mutationSupported: false,
    verified: true,
    notes: "Current verified device API requires a concrete device ID.",
  },
  {
    name: "locks",
    listSupported: false,
    detailSupported: false,
    mutationSupported: false,
    verified: false,
    notes: "Lock HTTP ingress is fail-closed.",
  },
  {
    name: "security",
    listSupported: false,
    detailSupported: false,
    mutationSupported: false,
    verified: false,
    notes: "Security HTTP ingress is fail-closed.",
  },
]
