import {
  requireSecurityRead,
} from "../guards/requireSecurityRead";

import {
  requireSecurityWrite,
} from "../guards/requireSecurityWrite";

export const securitySecurityRuntime = {
  requireRead:
    requireSecurityRead,

  requireWrite:
    requireSecurityWrite,
};
