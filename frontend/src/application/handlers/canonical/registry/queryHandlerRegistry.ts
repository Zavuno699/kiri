import type { QueryHandler } from "../contracts/queryHandler"

const registry = new Map<string, QueryHandler>()

export function registerQueryHandler(handler: QueryHandler): void
export function registerQueryHandler(
  queryType: string,
  handler: QueryHandler,
): void
export function registerQueryHandler(
  first: string | QueryHandler,
  second?: QueryHandler,
): void {
  const handler = typeof first === "string" ? second! : first
  const queryType = typeof first === "string" ? first : first.queryType
  registry.set(queryType, handler)
}

export function getQueryHandler(
  queryType: string,
): QueryHandler | undefined {
  return registry.get(queryType)
}

export function listQueryHandlers(): QueryHandler[] {
  return [...registry.values()]
}
