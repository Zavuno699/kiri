export interface PropertyRefreshAction {
  propertyId?: string
}

export function createPropertyRefreshAction(
  propertyId?: string,
): PropertyRefreshAction {
  return {
    propertyId,
  }
}
