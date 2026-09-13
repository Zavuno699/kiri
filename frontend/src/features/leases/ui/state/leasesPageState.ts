import {
  getPageDataState,
} from "../../../application/ui/state/pageDataStore";

import {
  getPageRuntimeState,
} from "../../../application/ui/state/pageRuntimeStore";

export function getLeasesPageState() {
  return {
    data:
      getPageDataState(
        "leases",
      ),

    runtime:
      getPageRuntimeState(
        "leases",
      ),
  };
}
