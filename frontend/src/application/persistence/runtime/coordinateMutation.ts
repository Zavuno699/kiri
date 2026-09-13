import {
  dispatchApplicationCommand,
} from "../../busRuntime/runtime/dispatchCommand";

import {
  writePersistence,
} from "../runtime/writePersistence";

import {
  runInvalidation,
} from "../invalidation/runInvalidation";

export async function coordinateMutation<TResult>(
  domain: string,
  resourceKey: string,
  command: unknown,
  capability?: string,
): Promise<TResult> {
  const result =
    await dispatchApplicationCommand<TResult>(
      command as never,
      {
        capability,
      },
    );

  const cacheKey =
    `${domain}:${resourceKey}`;

  writePersistence(
    cacheKey,
    result,
  );

  runInvalidation(
    domain,
    resourceKey,
  );

  return result;
}
