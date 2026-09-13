import {
  getPageRuntimeState,
} from "../../../application/ui/state/pageRuntimeStore";

export function selectPropertiesPageStatus() {
  return getPageRuntimeState(
    "properties",
  )?.status ?? "idle";
}
