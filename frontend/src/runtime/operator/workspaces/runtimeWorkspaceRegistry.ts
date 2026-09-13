import type {
  RuntimeOperatorSurface,
} from "../runtimeOperatorSurface"
import {
  runtimeOperatorSurfaces,
} from "../runtimeOperatorSurfaces"

export function getEnabledOperatorSurfaces():
  RuntimeOperatorSurface[] {
  return runtimeOperatorSurfaces
    .filter((item) => item.enabled)
    .sort((a, b) => a.order - b.order)
}
