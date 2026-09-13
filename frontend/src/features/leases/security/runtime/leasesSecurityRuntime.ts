import {
  requireLeasesRead,
} from "../guards/requireLeasesRead";

import {
  requireLeasesWrite,
} from "../guards/requireLeasesWrite";

export const leasesSecurityRuntime = {
  requireRead:
    requireLeasesRead,

  requireWrite:
    requireLeasesWrite,
};
