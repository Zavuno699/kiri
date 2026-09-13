import {
  projectCommandResult,
} from "../../projections/runtime/projectCommandResult";

export async function projectApiMutation<
  T = unknown,
>(
  domain: string,
  resourceKey: string,
  command: unknown,
  capability: string,
): Promise<T> {
  return projectCommandResult<T>(
    domain,
    resourceKey,
    command,
    capability,
  );
}
