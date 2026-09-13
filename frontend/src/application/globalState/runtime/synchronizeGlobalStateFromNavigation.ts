import {
  getSelectedRoute,
} from "../../navigation/state/navigationStore";

import {
  updateGlobalState,
} from "../state/globalStateStore";

export function synchronizeGlobalStateFromNavigation(): void {
  updateGlobalState({
    activeRoute:
      getSelectedRoute(),
  });
}
