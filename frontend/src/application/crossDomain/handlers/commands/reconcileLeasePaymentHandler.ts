import type {
  CommandHandler,
} from "../../../handlers/canonical/contracts/commandHandler";

import {
  reconcileLeasePayment,
} from "../../leasePayment/leasePaymentService";

export const reconcileLeasePaymentHandler:
  CommandHandler = {
    commandType:
      "lease-payment.reconcile",

    async execute(command) {
      return reconcileLeasePayment(
        command.payload as {
          leaseId: string;
          paymentId: string;
        },
      );
    },
  };
