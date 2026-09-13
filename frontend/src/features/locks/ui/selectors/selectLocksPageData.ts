import {
  getPageDataState,
} from "../../../application/ui/state/pageDataStore";

export function selectLocksPageData<T = unknown>() {
  return getPageDataState<T>(
    "locks",
  )?.data ?? null;
}
