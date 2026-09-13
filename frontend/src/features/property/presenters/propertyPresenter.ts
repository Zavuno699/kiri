import {
  buildPropertyViewModel,
} from "../models/propertyViewModel"

export function presentProperty(
  property: Parameters<
    typeof buildPropertyViewModel
  >[0],
) {
  return buildPropertyViewModel(property)
}
