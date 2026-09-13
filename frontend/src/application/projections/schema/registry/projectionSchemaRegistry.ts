import type { ProjectionSchema } from "../projectionSchema";

const schemas = new Map<string, ProjectionSchema>();

export function registerProjectionSchema(
  schema: ProjectionSchema,
): void {
  schemas.set(
    `${schema.projectionKey}:${schema.version}`,
    schema,
  );
}

export function getProjectionSchema(
  projectionKey: string,
  version: string,
): ProjectionSchema | undefined {
  return schemas.get(
    `${projectionKey}:${version}`,
  );
}

export function listProjectionSchemas(): ProjectionSchema[] {
  return Array.from(schemas.values());
}
