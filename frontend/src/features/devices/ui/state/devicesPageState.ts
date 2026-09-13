import {
  getPageDataState,
} from "../../../application/ui/state/pageDataStore";

import {
  getPageRuntimeState,
} from "../../../application/ui/state/pageRuntimeStore";

export function getDevicesPageState() {
  return {
    data:
      getPageDataState(
        "devices",
      ),

    runtime:
      getPageRuntimeState(
        "devices",
      ),
  };
}
