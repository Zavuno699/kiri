import {
  getPageDataState,
} from "../../../application/ui/state/pageDataStore";

import {
  getPageRuntimeState,
} from "../../../application/ui/state/pageRuntimeStore";

export function getLocksPageState() {
  return {
    data:
      getPageDataState(
        "locks",
      ),

    runtime:
      getPageRuntimeState(
        "locks",
      ),
  };
}
