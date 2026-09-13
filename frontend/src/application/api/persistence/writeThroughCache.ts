import {
  coordinateMutation,
} from "../../persistence/runtime/coordinateMutation";

export async function writeThroughCache<
  T = unknown,
>(
  domain: string,
  resourceKey: string,
  command: unknown,
  capability: string,
): Promise<T> {
  return coordinateMutation<T>(
    domain,
    resourceKey,
    command,
    capability,
  );
}
