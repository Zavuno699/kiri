import {
  getPageDataState,
} from "../../../application/ui/state/pageDataStore";

import {
  getPageRuntimeState,
} from "../../../application/ui/state/pageRuntimeStore";

export function getPropertiesPageState() {
  return {
    data:
      getPageDataState(
        "properties",
      ),

    runtime:
      getPageRuntimeState(
        "properties",
      ),
  };
}
