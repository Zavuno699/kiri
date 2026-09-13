export interface PropertyResourcePolicy {
  cacheable: boolean
  refreshable: boolean
  commandable: boolean
}

export const propertyResourcePolicy:
  PropertyResourcePolicy = {
  cacheable: true,
  refreshable: true,
  commandable: true,
}
