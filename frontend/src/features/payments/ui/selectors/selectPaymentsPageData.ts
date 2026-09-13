import {
  getPageDataState,
} from "../../../application/ui/state/pageDataStore";

export function selectPaymentsPageData<T = unknown>() {
  return getPageDataState<T>(
    "payments",
  )?.data ?? null;
}
