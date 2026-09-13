import {
  requireLocksRead,
} from "../guards/requireLocksRead";

import {
  requireLocksWrite,
} from "../guards/requireLocksWrite";

export const locksSecurityRuntime = {
  requireRead:
    requireLocksRead,

  requireWrite:
    requireLocksWrite,
};
