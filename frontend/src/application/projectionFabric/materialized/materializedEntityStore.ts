import type {
  MaterializedEntity,
} from "../contracts/materializedEntity";

const entities = new Map<
  string,
  MaterializedEntity
>();

function key(
  domain: string,
  id: string,
): string {
  return `${domain}:${id}`;
}

export function upsertMaterializedEntity<T>(
  entity: MaterializedEntity<T>,
): MaterializedEntity<T> {
  entities.set(
    key(
      entity.domain,
      entity.id,
    ),
    entity as MaterializedEntity,
  );

  return entity;
}

export function getMaterializedEntity(
  domain: string,
  id: string,
): MaterializedEntity | null {
  return (
    entities.get(
      key(
        domain,
        id,
      ),
    ) ??
    null
  );
}

export function listMaterializedEntities(
  domain?: string,
): MaterializedEntity[] {
  return [
    ...entities.values(),
  ].filter(
    (entity) =>
      !domain ||
      entity.domain ===
        domain,
  );
}

export function markMaterializedEntityStale(
  domain: string,
  id: string,
): boolean {
  const entity =
    getMaterializedEntity(
      domain,
      id,
    );

  if (!entity) {
    return false;
  }

  entity.stale =
    true;

  return true;
}

export function markMaterializedEntityFresh(
  domain: string,
  id: string,
): boolean {
  const entity =
    getMaterializedEntity(
      domain,
      id,
    );

  if (!entity) {
    return false;
  }

  entity.stale =
    false;

  return true;
}

export function clearMaterializedEntities(): void {
  entities.clear();
}
