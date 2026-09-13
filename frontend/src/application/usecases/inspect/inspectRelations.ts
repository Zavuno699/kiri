export interface RelationInspection {
  domain: string
  id: string
  relations: string[]
}

export function inspectRelations(
  domain: string,
  id: string,
  relations: string[] = [],
): RelationInspection {
  return {
    domain,
    id,
    relations: [...relations],
  }
}
