import {
  dispatchApplicationQuery,
} from "../../busRuntime/runtime/dispatchQuery";

import {
  applyProjection,
} from "./applyProjection";

export async function projectQueryResult<TResult>(
  domain: string,
  resourceKey: string,
  query: unknown,
): Promise<TResult> {
  const result =
    await dispatchApplicationQuery<TResult>(
      query as never,
    );

  applyProjection({
    domain,
    resourceKey,
    payload: result,
    source: "query",
    receivedAt:
      new Date().toISOString(),
  });

  return result;
}
