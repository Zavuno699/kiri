import type { ProjectionRefreshRequest } from "../refresh/projectionRefreshRequest";
import type { ProjectionRefreshResult } from "../refresh/projectionRefreshResult";

export type ProjectionRefreshHandler = (
  request: ProjectionRefreshRequest,
) => Promise<ProjectionRefreshResult> | ProjectionRefreshResult;

export class ProjectionRefreshOrchestrator {
  private readonly handlers = new Map<
    string,
    ProjectionRefreshHandler
  >();

  register(
    domain: string,
    projection: string,
    handler: ProjectionRefreshHandler,
  ): void {
    this.handlers.set(
      `${domain}:${projection}`,
      handler,
    );
  }

  async refresh(
    request: ProjectionRefreshRequest,
  ): Promise<ProjectionRefreshResult> {
    const startedAt = new Date().toISOString();
    const handler = this.handlers.get(
      `${request.domain}:${request.projection}`,
    );

    if (!handler) {
      return {
        domain: request.domain,
        projection: request.projection,
        entityId: request.entityId,
        startedAt,
        completedAt: new Date().toISOString(),
        status: "failed",
        error: "Projection refresh handler not registered",
      };
    }

    try {
      return await handler(request);
    } catch (error) {
      return {
        domain: request.domain,
        projection: request.projection,
        entityId: request.entityId,
        startedAt,
        completedAt: new Date().toISOString(),
        status: "failed",
        error:
          error instanceof Error
            ? error.message
            : String(error),
      };
    }
  }
}
