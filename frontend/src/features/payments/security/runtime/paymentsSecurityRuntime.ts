import {
  requirePaymentsRead,
} from "../guards/requirePaymentsRead";

import {
  requirePaymentsWrite,
} from "../guards/requirePaymentsWrite";

export const paymentsSecurityRuntime = {
  requireRead:
    requirePaymentsRead,

  requireWrite:
    requirePaymentsWrite,
};
