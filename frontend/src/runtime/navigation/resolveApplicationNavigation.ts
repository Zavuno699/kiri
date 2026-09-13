import {
  applicationNavigation,
} from "./applicationNavigation"

export function resolveApplicationNavigation(
  path: string,
) {
  return applicationNavigation.find(
    (item) => item.path === path,
  )
}
