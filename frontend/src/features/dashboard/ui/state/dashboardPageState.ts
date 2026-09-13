import {
  getPageDataState,
} from "../../../application/ui/state/pageDataStore";

import {
  getPageRuntimeState,
} from "../../../application/ui/state/pageRuntimeStore";

export function getDashboardPageState() {
  return {
    data:
      getPageDataState(
        "dashboard",
      ),

    runtime:
      getPageRuntimeState(
        "dashboard",
      ),
  };
}
