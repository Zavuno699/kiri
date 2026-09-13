import type { DomainRelationship } from "./domainRelationship"

export interface RelationshipIndex {
  add(value: DomainRelationship): void
  findBySource(domain: string, id: string): DomainRelationship[]
  findByTarget(domain: string, id: string): DomainRelationship[]
}

export function createRelationshipIndex(): RelationshipIndex {
  const values: DomainRelationship[] = []

  return {
    add(value) {
      values.push(value)
    },

    findBySource(domain, id) {
      return values.filter(
        (item) =>
          item.sourceDomain === domain &&
          item.sourceId === id,
      )
    },

    findByTarget(domain, id) {
      return values.filter(
        (item) =>
          item.targetDomain === domain &&
          item.targetId === id,
      )
    },
  }
}
