import {
  readThroughCache,
} from "../persistence/readThroughCache";

export async function dispatchResourceQuery<
  TResult = unknown,
>(
  domain: string,
  resourceKey: string,
  query: unknown,
): Promise<TResult> {
  return readThroughCache<TResult>(
    domain,
    resourceKey,
    query,
  );
}
