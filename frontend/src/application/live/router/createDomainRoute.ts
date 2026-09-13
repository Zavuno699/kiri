import type { LiveRoute } from "./liveRoute"

export function createDomainRoute(
  domain: string,
  handle: LiveRoute["handle"],
): LiveRoute {
  return {
    id:
      `${domain}.live`,
    domain,
    handle,
  }
}
