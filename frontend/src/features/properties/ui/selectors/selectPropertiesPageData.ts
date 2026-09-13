import {
  getPageDataState,
} from "../../../application/ui/state/pageDataStore";

export function selectPropertiesPageData<T = unknown>() {
  return getPageDataState<T>(
    "properties",
  )?.data ?? null;
}
