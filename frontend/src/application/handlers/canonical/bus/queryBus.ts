import type {
  Query,
} from "../contracts/query";

import {
  getQueryHandler,
} from "../registry/queryHandlerRegistry";

export async function dispatchQuery<
  TResult = unknown,
>(
  query: Query,
): Promise<TResult> {
  const handler =
    getQueryHandler(
      query.type,
    );

  if (!handler) {
    throw new Error(
      `No query handler registered for ${query.type}`,
    );
  }

  return (
    await handler.execute(query)
  ) as TResult;
}
