import {
  getPageData,
} from "../../../../application/ui/state/pageDataStore";

export function selectPropertiesPageData<T = unknown>() {
  return getPageData<T>(
    "properties",
  )?.data ?? null;
}
