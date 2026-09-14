import type { ProjectionDependency } from "../dependencies/projectionDependency";
import type { ProjectionInvalidation } from "./projectionInvalidation";

export function propagateInvalidation(
  root: ProjectionInvalidation,
  dependencies: ProjectionDependency[],
): ProjectionInvalidation[] {
  const result: ProjectionInvalidation[] = [root];
  const visited = new Set<string>([
    `${root.domain}:${root.projection}`,
  ]);

  let cursor = 0;

  while (cursor < result.length) {
    const current = result[cursor++];

    for (const dependency of dependencies) {
      const sourceKey =
        `${dependency.sourceDomain}:${dependency.sourceProjection}`;

      if (sourceKey !== `${current.domain}:${current.projection}`) {
        continue;
      }

      const targetKey =
        `${dependency.targetDomain}:${dependency.targetProjection}`;

      if (visited.has(targetKey)) {
        continue;
      }

      visited.add(targetKey);

      result.push({
        domain: dependency.targetDomain ?? "",
        projection: dependency.targetProjection ?? "",
        entityId: current.entityId,
        reason: "dependency-change",
        occurredAt: current.occurredAt,
        correlationId: current.correlationId,
      });
    }
  }

  return result;
}
