import {
  getPageDataState,
} from "../../../application/ui/state/pageDataStore";

export function selectDevicesPageData<T = unknown>() {
  return getPageDataState<T>(
    "devices",
  )?.data ?? null;
}
