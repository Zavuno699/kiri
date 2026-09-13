import {
  getPageDataState,
} from "../../../application/ui/state/pageDataStore";

import {
  getPageRuntimeState,
} from "../../../application/ui/state/pageRuntimeStore";

export function getPaymentsPageState() {
  return {
    data:
      getPageDataState(
        "payments",
      ),

    runtime:
      getPageRuntimeState(
        "payments",
      ),
  };
}
