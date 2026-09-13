import {
  getPageRuntimeState,
} from "../../../application/ui/state/pageRuntimeStore";

export function selectPaymentsPageStatus() {
  return getPageRuntimeState(
    "payments",
  )?.status ?? "idle";
}
