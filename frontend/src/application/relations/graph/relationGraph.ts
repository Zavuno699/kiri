import type { RelationNode } from "./relationNode"
import type { RelationEdge } from "./relationEdge"

export interface RelationGraph {
  nodes: RelationNode[]
  edges: RelationEdge[]
}

export function emptyRelationGraph(): RelationGraph {
  return {
    nodes: [],
    edges: [],
  }
}
