export interface PropertyRelationModel {
  targetDomain: string
  targetId: string
  relation: string
  confidence: "verified" | "derived" | "unverified"
}
