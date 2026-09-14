import {
  getPageData,
} from "../../../../application/ui/state/pageDataStore";

import {
  getPageRuntime,
} from "../../../../application/ui/state/pageRuntimeStore";

export function getLocksPageState() {
  return {
    data:
      getPageData(
        "locks",
      ),

    runtime:
      getPageRuntime(
        "locks",
      ),
  };
}
