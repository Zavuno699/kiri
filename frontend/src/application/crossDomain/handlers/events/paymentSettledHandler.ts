import type {
  EventHandler,
} from "../../../handlers/canonical/contracts/eventHandler";

import {
  refreshDashboardProjection,
} from "../../dashboardRefresh/dashboardRefreshService";

export const paymentSettledHandler:
  EventHandler = {
    eventType:
      "payment.settled",

    async handle(event) {
      await refreshDashboardProjection({
        correlationId:
          event.correlationId ?? null,
      });
    },
  };
