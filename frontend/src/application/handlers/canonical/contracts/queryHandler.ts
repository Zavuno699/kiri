export interface QueryHandler<Q = any, R = any> {
  queryType: string
  execute(query: Q): Promise<R> | R
}
