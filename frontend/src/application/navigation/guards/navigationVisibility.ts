import {
  authorizeCapability,
} from "../../security/core/securityAuthorizationService";

import {
  getNavigationItems,
} from "../state/navigationStore";

export function getVisibleNavigationItems() {
  return getNavigationItems()
    .filter(
      (item) =>
        authorizeCapability(
          item.capability,
        ).decision ===
        "allow",
    );
}
