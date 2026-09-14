import {
  getPageData,
} from "../../../../application/ui/state/pageDataStore";

export function selectDashboardPageData<T = unknown>() {
  return getPageData<T>(
    "dashboard",
  )?.data ?? null;
}
