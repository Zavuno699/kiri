import {
  projectApiMutation,
} from "../projection/projectApiMutation";

export async function convergeApiMutation<
  TResult = unknown,
>(
  domain: string,
  resourceKey: string,
  command: unknown,
  capability: string,
): Promise<TResult> {
  return projectApiMutation<TResult>(
    domain,
    resourceKey,
    command,
    capability,
  );
}
