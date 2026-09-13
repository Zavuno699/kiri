import {
  getVisiblePageActions,
} from "../../../application/ui/runtime/getVisiblePageActions";

export function getPropertiesPageActions() {
  return getVisiblePageActions(
    "properties",
  );
}
