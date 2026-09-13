export interface DomainRelationship {
  sourceDomain: string
  sourceId: string
  relation: string
  targetDomain: string
  targetId: string
  confidence: "verified" | "derived" | "unverified"
}

export function relation(
  sourceDomain: string,
  sourceId: string,
  relationName: string,
  targetDomain: string,
  targetId: string,
  confidence: DomainRelationship["confidence"] = "derived",
): DomainRelationship {
  return {
    sourceDomain,
    sourceId,
    relation: relationName,
    targetDomain,
    targetId,
    confidence,
  }
}
