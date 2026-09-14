import {
  getPageData,
} from "../../../../application/ui/state/pageDataStore";

import {
  getPageRuntime,
} from "../../../../application/ui/state/pageRuntimeStore";

export function getSecurityPageState() {
  return {
    data:
      getPageData(
        "security",
      ),

    runtime:
      getPageRuntime(
        "security",
      ),
  };
}
