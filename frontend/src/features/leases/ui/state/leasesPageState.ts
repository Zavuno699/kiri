import {
  getPageData,
} from "../../../../application/ui/state/pageDataStore";

import {
  getPageRuntime,
} from "../../../../application/ui/state/pageRuntimeStore";

export function getLeasesPageState() {
  return {
    data:
      getPageData(
        "leases",
      ),

    runtime:
      getPageRuntime(
        "leases",
      ),
  };
}
