import {
  getVisiblePageActions,
} from "../../../application/ui/runtime/getVisiblePageActions";

export function getLocksPageActions() {
  return getVisiblePageActions(
    "locks",
  );
}
