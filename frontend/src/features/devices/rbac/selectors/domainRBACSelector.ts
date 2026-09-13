import { devicesRBACAllowed } from "../guards/domainGuard";

export const selectDevicesRBACAllowed = (): boolean =>
  devicesRBACAllowed();
