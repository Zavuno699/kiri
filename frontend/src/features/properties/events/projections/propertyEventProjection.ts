import type { PropertyEvent } from "../propertyEvent"

export interface PropertyEventProjection {
  apply(event: PropertyEvent): unknown
}
