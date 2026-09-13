import type { ProjectionDependency } from "./projectionDependency";

export function topologicalProjectionOrder(
  dependencies: ProjectionDependency[],
): string[] {
  const nodes = new Set<string>();
  const incoming = new Map<string, number>();
  const outgoing = new Map<string, Set<string>>();

  for (const dependency of dependencies) {
    const source = `${dependency.sourceDomain}:${dependency.sourceProjection}`;
    const target = `${dependency.targetDomain}:${dependency.targetProjection}`;

    nodes.add(source);
    nodes.add(target);

    incoming.set(target, (incoming.get(target) ?? 0) + 1);

    const targets = outgoing.get(source) ?? new Set<string>();
    targets.add(target);
    outgoing.set(source, targets);

    if (!incoming.has(source)) {
      incoming.set(source, 0);
    }
  }

  const queue = Array.from(nodes).filter(
    (node) => (incoming.get(node) ?? 0) === 0,
  );

  const order: string[] = [];

  while (queue.length > 0) {
    const node = queue.shift()!;
    order.push(node);

    for (const target of outgoing.get(node) ?? []) {
      const nextIncoming = (incoming.get(target) ?? 0) - 1;
      incoming.set(target, nextIncoming);

      if (nextIncoming === 0) {
        queue.push(target);
      }
    }
  }

  return order.length === nodes.size
    ? order
    : Array.from(nodes);
}
