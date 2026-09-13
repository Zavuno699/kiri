import {
  ObservableState,
} from "../../../application/state/observableState"

export interface PropertyRuntimeState {
  selectedPropertyId?: string
  refreshing: boolean
  error?: string
}

export const propertyRuntime =
  new ObservableState<PropertyRuntimeState>(
    {
      refreshing: false,
    },
  )
