import type { ProjectionDependency } from "../dependencies/projectionDependency";
import { topologicalProjectionOrder } from "../dependencies/topologicalProjectionOrder";
import type { ProjectionRefreshRequest } from "../refresh/projectionRefreshRequest";

export function buildCoordinatedRefreshRequests(
  root: ProjectionRefreshRequest,
  dependencies: ProjectionDependency[],
): ProjectionRefreshRequest[] {
  const ordered = topologicalProjectionOrder(dependencies);

  const rootKey = `${root.domain}:${root.projection}`;

  const matching = ordered.filter(
    (key) =>
      key === rootKey ||
      dependencies.some(
        (dependency) =>
          `${dependency.targetDomain}:${dependency.targetProjection}` ===
          key,
      ),
  );

  return matching.map((key) => {
    const [domain, projection] = key.split(":");

    return {
      domain,
      projection,
      entityId: root.entityId,
      reason: key === rootKey ? root.reason : "dependency",
      requestedAt: root.requestedAt,
      correlationId: root.correlationId,
    };
  });
}
