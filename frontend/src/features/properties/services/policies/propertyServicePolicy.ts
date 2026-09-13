export interface PropertyServicePolicy {
  readable: boolean
  refreshable: boolean
  commandable: boolean
}

export const propertyServicePolicy:
  PropertyServicePolicy = {
  readable: true,
  refreshable: true,
  commandable: true,
}
