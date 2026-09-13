import {
  loadDevicesPage,
} from "./loadDevicesPage";

import {
  getDevicesPageState,
} from "../state/devicesPageState";

import {
  markDomainPageStale,
} from "../../../application/ui/runtime/markDomainPageStale";

export const devicesPageController = {
  load:
    loadDevicesPage,

  state:
    getDevicesPageState,

  invalidate() {
    markDomainPageStale(
      "devices",
    );
  },
};
