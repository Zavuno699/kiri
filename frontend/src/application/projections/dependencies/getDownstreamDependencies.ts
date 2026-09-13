import type { ProjectionDependency } from "./projectionDependency";

export function getDownstreamDependencies(
  dependencies: ProjectionDependency[],
  sourceDomain: string,
  sourceProjection: string,
): ProjectionDependency[] {
  return dependencies.filter(
    (dependency) =>
      dependency.sourceDomain === sourceDomain &&
      dependency.sourceProjection === sourceProjection,
  );
}
