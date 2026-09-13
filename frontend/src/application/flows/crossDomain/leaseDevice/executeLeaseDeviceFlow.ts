import {
  flowCommand,
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
      command,
      "devices.command",
    );

  flowProjection(
    "devices",
    "devices",
    result,
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
