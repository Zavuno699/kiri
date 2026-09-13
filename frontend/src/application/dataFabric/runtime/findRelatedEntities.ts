export interface RelatedEntity {
  type: string
  id: string
  label?: string
}

export function findRelatedEntities(
  source: { type: string; id: string },
): RelatedEntity[] {
  void source
  return []
}
