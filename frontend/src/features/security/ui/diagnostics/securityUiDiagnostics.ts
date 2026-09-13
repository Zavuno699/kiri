import {
  getSecurityPageState,
} from "../state/securityPageState";

import {
  getSecurityPageActions,
} from "../actions/getSecurityPageActions";

export function getSecurityUiDiagnostics() {
  return {
    domain:
      "security",

    state:
      getSecurityPageState(),

    actions:
      getSecurityPageActions(),
  };
}
