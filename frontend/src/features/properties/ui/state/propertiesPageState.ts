import {
  getPageData,
} from "../../../../application/ui/state/pageDataStore";

import {
  getPageRuntime,
} from "../../../../application/ui/state/pageRuntimeStore";

export function getPropertiesPageState() {
  return {
    data:
      getPageData(
        "properties",
      ),

    runtime:
      getPageRuntime(
        "properties",
      ),
  };
}
