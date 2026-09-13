import type {
  ApplicationQuery,
} from "./query"

export type QueryExecutor<
  TPayload = unknown,
  TResult = unknown,
> = (
  query: ApplicationQuery<TPayload>,
) => Promise<TResult> | TResult

const executors =
  new Map<string, QueryExecutor<any, any>>()

export function registerQueryExecutor(
  type: string,
  executor: QueryExecutor,
): void {
  executors.set(type, executor)
}

export async function executeQuery<
  TPayload = unknown,
  TResult = unknown,
>(
  query: ApplicationQuery<TPayload>,
): Promise<TResult> {
  const executor = executors.get(query.type)

  if (!executor) {
    throw new Error(
      `No query executor registered for ${query.type}`,
    )
  }

  return executor(query) as Promise<TResult>
}
