import {
  flowCommand,
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
      command,
      "payments.write",
    );

  flowProjection(
    "leases",
    "leases",
    result,
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
