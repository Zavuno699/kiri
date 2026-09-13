import {
  listDependencies,
} from "../registry/dependencyRegistry";

export interface DependencyDiagnostics {
  total: number;
  roots: string[];
  orphaned: string[];
  missingReferences: string[];
}

export function getDependencyDiagnostics(): DependencyDiagnostics {
  const nodes =
    listDependencies();

  const keys = new Set(
    nodes.map(
      (node) => node.key,
    ),
  );

  const referenced = new Set<string>();

  const missing = new Set<string>();

  for (const node of nodes) {
    for (const dependency of node.dependencies) {
      referenced.add(dependency);

      if (!keys.has(dependency)) {
        missing.add(dependency);
      }
    }
  }

  return {
    total: nodes.length,
    roots: nodes
      .filter(
        (node) =>
          node.dependencies.length === 0,
      )
      .map(
        (node) => node.key,
      ),
    orphaned: nodes
      .filter(
        (node) =>
          !referenced.has(node.key) &&
          node.dependencies.length > 0,
      )
      .map(
        (node) => node.key,
      ),
    missingReferences: [
      ...missing,
    ],
  };
}
