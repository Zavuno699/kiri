import {
  getPageData,
} from "../../../../application/ui/state/pageDataStore";

export function selectDevicesPageData<T = unknown>() {
  return getPageData<T>(
    "devices",
  )?.data ?? null;
}
