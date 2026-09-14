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

export async function executeSecurityRecoveryFlow(
  command: unknown,
): Promise<unknown> {
  const result =
    await flowCommand(
      command as FlowCommand,
      "security",
    );

  flowProjection(
    "security",
    "security",
  );

  await flowEvent(
    "security",
    "security",
    {
      type:
        "security.updated",
      payload:
        result,
    },
  );

  return result;
}
