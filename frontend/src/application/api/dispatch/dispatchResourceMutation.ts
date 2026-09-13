import {
  writeThroughCache,
} from "../persistence/writeThroughCache";

export async function dispatchResourceMutation<
  TResult = unknown,
>(
  domain: string,
  resourceKey: string,
  command: unknown,
  capability: string,
): Promise<TResult> {
  return writeThroughCache<TResult>(
    domain,
    resourceKey,
    command,
    capability,
  );
}
