import { locksRBACAllowed } from "../guards/domainGuard";

export const selectLocksRBACAllowed = (): boolean =>
  locksRBACAllowed();
