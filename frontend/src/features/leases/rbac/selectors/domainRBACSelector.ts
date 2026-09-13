import { leasesRBACAllowed } from "../guards/domainGuard";

export const selectLeasesRBACAllowed = (): boolean =>
  leasesRBACAllowed();
