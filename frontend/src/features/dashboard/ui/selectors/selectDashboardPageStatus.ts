import {
  getPageRuntimeState,
} from "../../../application/ui/state/pageRuntimeStore";

export function selectDashboardPageStatus() {
  return getPageRuntimeState(
    "dashboard",
  )?.status ?? "idle";
}
