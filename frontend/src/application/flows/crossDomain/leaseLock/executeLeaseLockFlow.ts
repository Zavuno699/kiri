import {
  flowCommand,
  type FlowCommand,
} from "../../commands/flowCommand";

import {
  flowProjection,
} from "../../state/flowProjection";

import {
  flowEvent,
} from "../../events/flowEvent";

export async function executeLeaseLockFlow(
  command: unknown,
): Promise<unknown> {
  const result =
    await flowCommand(
      command as FlowCommand,
      "locks",
    );

  flowProjection(
    "locks",
    "locks",
  );

  await flowEvent(
    "locks",
    "locks",
    {
      type:
        "lock.updated",
      payload:
        result,
    },
  );

  return result;
}
