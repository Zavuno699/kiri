import {
  requireDevicesRead,
} from "../guards/requireDevicesRead";

import {
  requireDevicesWrite,
} from "../guards/requireDevicesWrite";

export const devicesSecurityRuntime = {
  requireRead:
    requireDevicesRead,

  requireWrite:
    requireDevicesWrite,
};
