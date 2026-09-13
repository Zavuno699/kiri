import type { ProjectionDependency } from "./projectionDependency";

export type ProjectionDependencyGraph = {
  nodes: string[];
  edges: ProjectionDependency[];
};

export function createProjectionDependencyGraph(
  dependencies: ProjectionDependency[],
): ProjectionDependencyGraph {
  const nodes = new Set<string>();

  for (const dependency of dependencies) {
    nodes.add(
      `${dependency.sourceDomain}:${dependency.sourceProjection}`,
    );
    nodes.add(
      `${dependency.targetDomain}:${dependency.targetProjection}`,
    );
  }

  return {
    nodes: Array.from(nodes),
    edges: [...dependencies],
  };
}
