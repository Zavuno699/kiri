import type { ProjectionDefinition } from "./projectionDefinition";

const definitions = new Map<string, ProjectionDefinition>();

export function registerProjectionDefinition(
  definition: ProjectionDefinition,
): void {
  definitions.set(
    definition.projectionKey,
    definition,
  );
}

export function getProjectionDefinition(
  projectionKey: string,
): ProjectionDefinition | undefined {
  return definitions.get(projectionKey);
}

export function listProjectionDefinitions(): ProjectionDefinition[] {
  return Array.from(definitions.values());
}
