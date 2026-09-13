export type MaterializedEntityRecord = {
  domain: string;
  id: string;
  version: number;
  updatedAt: string;
  data: unknown;
};

const store = new Map<string, MaterializedEntityRecord>();

function key(domain: string, id: string): string {
  return `${domain}:${id}`;
}

export function getMaterializedEntity(
  domain: string,
  id: string,
): MaterializedEntityRecord | undefined {
  return store.get(key(domain, id));
}

export function setMaterializedEntity(
  domain: string,
  id: string,
  record: MaterializedEntityRecord,
): void {
  store.set(key(domain, id), record);
}

export function removeMaterializedEntity(
  domain: string,
  id: string,
): void {
  store.delete(key(domain, id));
}

export function listMaterializedEntities(
  domain?: string,
): MaterializedEntityRecord[] {
  const values = Array.from(store.values());
  return domain
    ? values.filter((item) => item.domain === domain)
    : values;
}

export function clearMaterializedEntities(): void {
  store.clear();
}
