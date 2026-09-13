import type { DomainRelationship } from "../../../application/relationships/domainRelationship"

export function linkPropertyToPayment(
  propertyId: string,
  paymentId: string,
): DomainRelationship {
  return {
    sourceDomain: "property",
    sourceId: propertyId,
    relation: "has-payment",
    targetDomain: "payment",
    targetId: paymentId,
    confidence: "derived",
  }
}
