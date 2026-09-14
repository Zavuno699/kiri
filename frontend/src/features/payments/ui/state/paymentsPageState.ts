import {
  getPageData,
} from "../../../../application/ui/state/pageDataStore";

import {
  getPageRuntime,
} from "../../../../application/ui/state/pageRuntimeStore";

export function getPaymentsPageState() {
  return {
    data:
      getPageData(
        "payments",
      ),

    runtime:
      getPageRuntime(
        "payments",
      ),
  };
}
