import type { ProjectionMigration } from "./projectionMigration";

const migrations = new Map<string, ProjectionMigration>();

function key(
  projectionKey: string,
  from: ProjectionMigration["from"],
  to: ProjectionMigration["to"],
): string {
  return [
    projectionKey,
    `${from.major}.${from.minor}.${from.patch}`,
    `${to.major}.${to.minor}.${to.patch}`,
  ].join(":");
}

export function registerProjectionMigration(
  migration: ProjectionMigration,
): void {
  migrations.set(
    key(
      migration.projectionKey,
      migration.from,
      migration.to,
    ),
    migration,
  );
}

export function getProjectionMigration(
  projectionKey: string,
  from: ProjectionMigration["from"],
  to: ProjectionMigration["to"],
): ProjectionMigration | undefined {
  return migrations.get(
    key(projectionKey, from, to),
  );
}

export function listProjectionMigrations(): ProjectionMigration[] {
  return Array.from(migrations.values());
}
