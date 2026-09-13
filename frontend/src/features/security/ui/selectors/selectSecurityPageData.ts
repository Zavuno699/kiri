import {
  getPageDataState,
} from "../../../application/ui/state/pageDataStore";

export function selectSecurityPageData<T = unknown>() {
  return getPageDataState<T>(
    "security",
  )?.data ?? null;
}
