import type { LiveEvent } from "../events/liveEvent"
import type { LiveRoute } from "./liveRoute"

export interface LiveRouter {
  register(route: LiveRoute): void
  route(event: LiveEvent): void
}

export function createLiveRouter(): LiveRouter {
  const routes: LiveRoute[] = []

  return {
    register(route) {
      routes.push(route)
    },

    route(event) {
      for (const route of routes) {
        const domainMatches =
          route.domain === undefined ||
          route.domain === event.domain

        const typeMatches =
          route.eventType === undefined ||
          route.eventType === event.type

        if (domainMatches && typeMatches) {
          route.handle(event)
        }
      }
    },
  }
}
