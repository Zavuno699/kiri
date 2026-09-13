import type { ProjectionRefreshRequest } from "./projectionRefreshRequest";

const requests = new Map<string, ProjectionRefreshRequest>();

function key(request: ProjectionRefreshRequest): string {
  return [
    request.domain,
    request.projection,
    request.entityId ?? "*",
  ].join(":");
}

export function registerProjectionRefresh(
  request: ProjectionRefreshRequest,
): void {
  requests.set(key(request), request);
}

export function getProjectionRefresh(
  domain: string,
  projection: string,
  entityId?: string,
): ProjectionRefreshRequest | undefined {
  return requests.get(
    `${domain}:${projection}:${entityId ?? "*"}`,
  );
}

export function listProjectionRefreshRequests(): ProjectionRefreshRequest[] {
  return Array.from(requests.values());
}

export function clearProjectionRefreshRegistry(): void {
  requests.clear();
}
