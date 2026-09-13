export interface DashboardRelationModel {
  targetDomain: string
  targetId: string
  relation: string
  confidence: "verified" | "derived" | "unverified"
}
