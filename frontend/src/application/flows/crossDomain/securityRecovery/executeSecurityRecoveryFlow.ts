import {
  flowCommand,
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
      command,
      "recovery.execute",
    );

  flowProjection(
    "security",
    "security",
    result,
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
