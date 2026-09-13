import {
  coordinateMutation,
} from "../../../../application/persistence/runtime/coordinateMutation";

import {
  requireCapability,
} from "../../../../application/security/guards/requireCapability";

export async function executePropertiesCommand<TResult = unknown>(
  command: unknown,
  capability: string,
): Promise<TResult> {
  requireCapability(
    capability,
  );

  return coordinateMutation<TResult>(
    "properties",
    "properties",
    command,
    capability,
  );
}
