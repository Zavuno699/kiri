import { securityRBACAllowed } from "../guards/domainGuard";

export const selectSecurityRBACAllowed = (): boolean =>
  securityRBACAllowed();
