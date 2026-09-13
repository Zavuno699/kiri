export interface LockRelationModel {
  targetDomain: string
  targetId: string
  relation: string
  confidence: "verified" | "derived" | "unverified"
}
