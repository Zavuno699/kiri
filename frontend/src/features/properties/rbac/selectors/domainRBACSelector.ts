import { propertiesRBACAllowed } from "../guards/domainGuard";

export const selectPropertiesRBACAllowed = (): boolean =>
  propertiesRBACAllowed();
