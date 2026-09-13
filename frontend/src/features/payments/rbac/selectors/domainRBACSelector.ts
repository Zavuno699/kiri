import { paymentsRBACAllowed } from "../guards/domainGuard";

export const selectPaymentsRBACAllowed = (): boolean =>
  paymentsRBACAllowed();
