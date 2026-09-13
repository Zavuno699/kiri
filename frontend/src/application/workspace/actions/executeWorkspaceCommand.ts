import {
  requireCapability,
} from "../../security/guards/requireCapability";

import {
  dispatchResourceCommand,
} from "../../api/dispatch/dispatchResourceCommand";

export async function executeWorkspaceCommand<
  TResult = unknown,
>(
  capability: string,
  command: unknown,
): Promise<TResult> {
  requireCapability(
    capability,
  );

  return dispatchResourceCommand<TResult>(
    command,
    capability,
  );
}
