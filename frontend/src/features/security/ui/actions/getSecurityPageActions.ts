import {
  getVisiblePageActions,
} from "../../../application/ui/runtime/getVisiblePageActions";

export function getSecurityPageActions() {
  return getVisiblePageActions(
    "security",
  );
}
