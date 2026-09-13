import type {
  Query,
} from "../../handlers/canonical/contracts/query";

import {
  dispatchQuery as dispatchCanonicalQuery,
} from "../../handlers/canonical/bus/queryBus";

export async function dispatchApplicationQuery<
  TResult = unknown,
>(
  query: Query,
): Promise<TResult> {
  return dispatchCanonicalQuery<TResult>(
    query,
  );
}
