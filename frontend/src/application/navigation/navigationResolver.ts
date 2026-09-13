import {
  domainNavigation,
} from "./domainNavigation"

export function resolveNavigation(
  pathname: string,
) {
  return (
    domainNavigation.find(
      (item) => item.path === pathname,
    ) ?? null
  )
}
