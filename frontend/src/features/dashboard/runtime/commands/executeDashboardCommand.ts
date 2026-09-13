import {
  coordinateMutation,
} from "../../../../application/persistence/runtime/coordinateMutation";

import {
  requireCapability,
} from "../../../../application/security/guards/requireCapability";

export async function executeDashboardCommand<TResult = unknown>(
  command: unknown,
  capability: string,
): Promise<TResult> {
  requireCapability(
    capability,
  );

  return coordinateMutation<TResult>(
    "dashboard",
    "dashboard",
    command,
    capability,
  );
}
