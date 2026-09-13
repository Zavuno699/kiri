import {
  dispatchApplicationQuery,
} from "../../busRuntime/runtime/dispatchQuery";

import {
  writePersistence,
} from "./writePersistence";

export async function coordinateRefresh<TResult>(
  domain: string,
  resourceKey: string,
  query: unknown,
): Promise<TResult> {
  const result =
    await dispatchApplicationQuery<TResult>(
      query as never,
    );

  writePersistence(
    `${domain}:${resourceKey}`,
    result,
  );

  return result;
}
