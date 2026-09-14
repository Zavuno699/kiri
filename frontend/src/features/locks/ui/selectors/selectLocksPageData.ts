import {
  getPageData,
} from "../../../../application/ui/state/pageDataStore";

export function selectLocksPageData<T = unknown>() {
  return getPageData<T>(
    "locks",
  )?.data ?? null;
}
