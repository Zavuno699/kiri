import {
  getPageData,
} from "../../../../application/ui/state/pageDataStore";

export function selectLeasesPageData<T = unknown>() {
  return getPageData<T>(
    "leases",
  )?.data ?? null;
}
