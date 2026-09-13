import {
  getPageRuntimeState,
} from "../../../application/ui/state/pageRuntimeStore";

export function selectLocksPageStatus() {
  return getPageRuntimeState(
    "locks",
  )?.status ?? "idle";
}
