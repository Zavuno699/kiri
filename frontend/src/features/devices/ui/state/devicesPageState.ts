import {
  getPageData,
} from "../../../../application/ui/state/pageDataStore";

import {
  getPageRuntime,
} from "../../../../application/ui/state/pageRuntimeStore";

export function getDevicesPageState() {
  return {
    data:
      getPageData(
        "devices",
      ),

    runtime:
      getPageRuntime(
        "devices",
      ),
  };
}
