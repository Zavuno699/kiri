export interface RelationEdge {
  source: string
  target: string
  relation: string
  confidence: "verified" | "derived" | "unverified"
}
