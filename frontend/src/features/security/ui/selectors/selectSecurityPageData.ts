import {
  getPageData,
} from "../../../../application/ui/state/pageDataStore";

export function selectSecurityPageData<T = unknown>() {
  return getPageData<T>(
    "security",
  )?.data ?? null;
}
