import {
  getPageData,
} from "../../../../application/ui/state/pageDataStore";

export function selectPaymentsPageData<T = unknown>() {
  return getPageData<T>(
    "payments",
  )?.data ?? null;
}
