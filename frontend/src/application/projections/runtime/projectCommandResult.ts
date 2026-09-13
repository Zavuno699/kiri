import {
  dispatchApplicationCommand,
} from "../../busRuntime/runtime/dispatchCommand";

import {
  applyProjection,
} from "./applyProjection";

export async function projectCommandResult<TResult>(
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

  applyProjection({
    domain,
    resourceKey,
    payload: result,
    source: "command",
    receivedAt:
      new Date().toISOString(),
  });

  return result;
}
