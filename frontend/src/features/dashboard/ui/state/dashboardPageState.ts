import {
  getPageData,
} from "../../../../application/ui/state/pageDataStore";

import {
  getPageRuntime,
} from "../../../../application/ui/state/pageRuntimeStore";

export function getDashboardPageState() {
  return {
    data:
      getPageData(
        "dashboard",
      ),

    runtime:
      getPageRuntime(
        "dashboard",
      ),
  };
}
