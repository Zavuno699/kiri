import type {
  DependencyNode,
} from "../contracts/dependencyNode";

const nodes = new Map<
  string,
  DependencyNode
>();

export function registerDependency(
  node: DependencyNode,
): void {
  nodes.set(node.key, node);
}

export function getDependency(
  key: string,
): DependencyNode | null {
  return nodes.get(key) ?? null;
}

export function listDependencies(): DependencyNode[] {
  return [...nodes.values()];
}
