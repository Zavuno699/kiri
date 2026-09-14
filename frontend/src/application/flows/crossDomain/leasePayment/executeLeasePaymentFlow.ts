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

export async function executeLeasePaymentFlow(
  command: unknown,
): Promise<unknown> {
  const result =
    await flowCommand(
      command as FlowCommand,
      "payments",
    );

  flowProjection(
    "leases",
    "leases",
  );

  await flowEvent(
    "payments",
    "payments",
    {
      type:
        "payment.updated",
      payload:
        result,
    },
  );

  return result;
}
