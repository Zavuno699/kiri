import {
  getPageDataState,
} from "../../../application/ui/state/pageDataStore";

export function selectLeasesPageData<T = unknown>() {
  return getPageDataState<T>(
    "leases",
  )?.data ?? null;
}
