import {
  getPropertiesPageState,
} from "../state/propertiesPageState";

import {
  getPropertiesPageActions,
} from "../actions/getPropertiesPageActions";

export function getPropertiesUiDiagnostics() {
  return {
    domain:
      "properties",

    state:
      getPropertiesPageState(),

    actions:
      getPropertiesPageActions(),
  };
}
