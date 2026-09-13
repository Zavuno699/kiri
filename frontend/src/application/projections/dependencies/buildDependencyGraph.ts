import type { ProjectionDependency } from "./projectionDependency";
import type { ProjectionDependencyGraph } from "./projectionDependencyGraph";
import { createProjectionDependencyGraph } from "./projectionDependencyGraph";

export function buildDependencyGraph(
  dependencies: ProjectionDependency[],
): ProjectionDependencyGraph {
  return createProjectionDependencyGraph(dependencies);
}
