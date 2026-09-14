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

export async function executeLeaseDeviceFlow(
  command: unknown,
): Promise<unknown> {
  const result =
    await flowCommand(
      command as FlowCommand,
      "devices",
    );

  flowProjection(
    "devices",
    "devices",
  );

  await flowEvent(
    "devices",
    "devices",
    {
      type:
        "device.updated",
      payload:
        result,
    },
  );

  return result;
}
