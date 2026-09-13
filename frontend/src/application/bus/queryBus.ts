export interface Query<TResponse = unknown> { readonly __response?: TResponse;
  type: string
  payload?: unknown
}

export interface QueryHandler<TQuery = unknown> {
  execute(query: TQuery): Promise<unknown>
}

export class QueryBus {
  private readonly handlers =
    new Map<string, QueryHandler>()

  register(
    type: string,
    handler: QueryHandler,
  ): void {
    this.handlers.set(type, handler)
  }

  async dispatch<T>(
    query: Query,
  ): Promise<T> {
    const handler =
      this.handlers.get(query.type)

    if (!handler) {
      throw new Error(
        `No query handler registered for ${query.type}`,
      )
    }

    return (
      await handler.execute(query)
    ) as T
  }

  has(type: string): boolean {
    return this.handlers.has(type)
  }
}

export const queryBus =
  new QueryBus()
