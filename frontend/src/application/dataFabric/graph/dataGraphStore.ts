import type {
  DataGraphNode,
} from "../contracts/graphNode";

import type {
  DataGraphEdge,
} from "../contracts/graphEdge";

const nodes = new Map<
  string,
  DataGraphNode
>();

const edges = new Map<
  string,
  DataGraphEdge
>();

export function registerGraphNode(
  node: DataGraphNode,
): void {
  nodes.set(
    node.id,
    node,
  );
}

export function registerGraphEdge(
  edge: DataGraphEdge,
): void {
  edges.set(
    edge.id,
    edge,
  );
}

export function listGraphNodes(): DataGraphNode[] {
  return [
    ...nodes.values(),
  ];
}

export function listGraphEdges(): DataGraphEdge[] {
  return [
    ...edges.values(),
  ];
}
