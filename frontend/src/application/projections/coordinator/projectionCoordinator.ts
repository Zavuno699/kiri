import type { ProjectionDependency } from "../dependencies/projectionDependency";
import { propagateInvalidation } from "../invalidation/propagateInvalidation";
import type { ProjectionInvalidation } from "../invalidation/projectionInvalidation";
import type { ProjectionRefreshRequest } from "../refresh/projectionRefreshRequest";

export class ProjectionCoordinator {
  private readonly dependencies: ProjectionDependency[];

  constructor(
    dependencies: ProjectionDependency[],
  ) {
    this.dependencies = dependencies;
  }

  invalidate(
    invalidation: ProjectionInvalidation,
  ): ProjectionInvalidation[] {
    return propagateInvalidation(
      invalidation,
      this.dependencies,
    );
  }

  toRefreshRequests(
    invalidations: ProjectionInvalidation[],
  ): ProjectionRefreshRequest[] {
    return invalidations.map((item) => ({
      domain: item.domain,
      projection: item.projection,
      entityId: item.entityId,
      reason:
        item.reason === "diverged"
          ? "diverged"
          : item.reason === "stale"
            ? "stale"
            : item.reason === "dependency-change"
              ? "dependency"
              : "invalidation",
      requestedAt: item.occurredAt,
      correlationId: item.correlationId,
    }));
  }
}
