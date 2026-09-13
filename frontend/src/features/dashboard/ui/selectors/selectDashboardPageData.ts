import {
  getPageDataState,
} from "../../../application/ui/state/pageDataStore";

export function selectDashboardPageData<T = unknown>() {
  return getPageDataState<T>(
    "dashboard",
  )?.data ?? null;
}
