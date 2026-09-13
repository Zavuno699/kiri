import {
  getPageRuntimeState,
} from "../../../application/ui/state/pageRuntimeStore";

export function selectLeasesPageStatus() {
  return getPageRuntimeState(
    "leases",
  )?.status ?? "idle";
}
