import {
  getLeasesPageState,
} from "../state/leasesPageState";

import {
  getLeasesPageActions,
} from "../actions/getLeasesPageActions";

export function getLeasesUiDiagnostics() {
  return {
    domain:
      "leases",

    state:
      getLeasesPageState(),

    actions:
      getLeasesPageActions(),
  };
}
