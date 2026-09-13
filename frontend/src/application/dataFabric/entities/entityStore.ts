import type {
  EntityRecord,
} from "../contracts/entityRecord";

const records = new Map<
  string,
  EntityRecord
>();

export function registerEntity<T>(
  entity: EntityRecord<T>,
): void {
  records.set(
    entity.id,
    entity as EntityRecord,
  );
}

export function getEntity(
  id: string,
): EntityRecord | null {
  return (
    records.get(id) ??
    null
  );
}

export function updateEntity(
  id: string,
  patch: Partial<EntityRecord>,
): void {
  const current =
    records.get(id);

  if (!current) {
    return;
  }

  records.set(
    id,
    {
      ...current,
      ...patch,
      version:
        current.version + 1,
      updatedAt:
        new Date().toISOString(),
    },
  );
}

export function listEntities(): EntityRecord[] {
  return [
    ...records.values(),
  ];
}

export function removeEntity(
  id: string,
): void {
  records.delete(id);
}
