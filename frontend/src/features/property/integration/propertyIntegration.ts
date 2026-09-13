import {
  presentProperty,
} from "../presenters/propertyPresenter"

export function integrateProperty(
  raw: Parameters<typeof presentProperty>[0],
) {
  return presentProperty(raw)
}
