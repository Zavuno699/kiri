import {
  getPageRuntimeState,
} from "../../../application/ui/state/pageRuntimeStore";

export function selectSecurityPageStatus() {
  return getPageRuntimeState(
    "security",
  )?.status ?? "idle";
}
