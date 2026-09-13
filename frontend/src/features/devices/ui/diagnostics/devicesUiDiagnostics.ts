import {
  getDevicesPageState,
} from "../state/devicesPageState";

import {
  getDevicesPageActions,
} from "../actions/getDevicesPageActions";

export function getDevicesUiDiagnostics() {
  return {
    domain:
      "devices",

    state:
      getDevicesPageState(),

    actions:
      getDevicesPageActions(),
  };
}
