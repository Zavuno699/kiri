export interface LeaseRelationModel {
  targetDomain: string
  targetId: string
  relation: string
  confidence: "verified" | "derived" | "unverified"
}
