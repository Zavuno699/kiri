import {
  getPageRuntimeState,
} from "../../../application/ui/state/pageRuntimeStore";

export function selectDevicesPageStatus() {
  return getPageRuntimeState(
    "devices",
  )?.status ?? "idle";
}
