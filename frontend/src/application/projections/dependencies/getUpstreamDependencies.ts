import type { ProjectionDependency } from "./projectionDependency";

export function getUpstreamDependencies(
  dependencies: ProjectionDependency[],
  targetDomain: string,
  targetProjection: string,
): ProjectionDependency[] {
  return dependencies.filter(
    (dependency) =>
      dependency.targetDomain === targetDomain &&
      dependency.targetProjection === targetProjection,
  );
}
