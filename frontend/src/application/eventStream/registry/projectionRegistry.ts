import type {
  ProjectionDefinition,
} from "../contracts/projectionDefinition";

const projections = new Map<
  string,
  ProjectionDefinition
>();

export function registerProjection(
  projection: ProjectionDefinition,
): void {
  projections.set(
    projection.id,
    projection,
  );
}

export function getProjection(
  projectionId: string,
): ProjectionDefinition | null {
  return (
    projections.get(
      projectionId,
    ) ??
    null
  );
}

export function listProjections(): ProjectionDefinition[] {
  return [
    ...projections.values(),
  ];
}

export function listProjectionsByDomain(
  domain: string,
): ProjectionDefinition[] {
  return listProjections().filter(
    (projection) =>
      projection.domain ===
      domain,
  );
}
