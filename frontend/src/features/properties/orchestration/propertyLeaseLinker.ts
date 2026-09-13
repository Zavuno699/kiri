import type { DomainRelationship } from "../../../application/relationships/domainRelationship"

export function linkPropertyToLease(
  propertyId: string,
  leaseId: string,
): DomainRelationship {
  return {
    sourceDomain: "property",
    sourceId: propertyId,
    relation: "has-lease",
    targetDomain: "lease",
    targetId: leaseId,
    confidence: "derived",
  }
}
