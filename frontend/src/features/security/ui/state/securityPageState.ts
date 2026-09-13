import {
  getPageDataState,
} from "../../../application/ui/state/pageDataStore";

import {
  getPageRuntimeState,
} from "../../../application/ui/state/pageRuntimeStore";

export function getSecurityPageState() {
  return {
    data:
      getPageDataState(
        "security",
      ),

    runtime:
      getPageRuntimeState(
        "security",
      ),
  };
}
