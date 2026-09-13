import {
  registerPageActions,
} from "./pageActionRegistry";

import {
  dashboardPageActions,
} from "./dashboardPageActions";

import {
  propertiesPageActions,
} from "./propertiesPageActions";

import {
  leasesPageActions,
} from "./leasesPageActions";

import {
  paymentsPageActions,
} from "./paymentsPageActions";

import {
  devicesPageActions,
} from "./devicesPageActions";

import {
  locksPageActions,
} from "./locksPageActions";

import {
  securityPageActions,
} from "./securityPageActions";

export function registerCanonicalPageActions(): void {
  registerPageActions(
    "dashboard",
    dashboardPageActions,
  );

  registerPageActions(
    "properties",
    propertiesPageActions,
  );

  registerPageActions(
    "leases",
    leasesPageActions,
  );

  registerPageActions(
    "payments",
    paymentsPageActions,
  );

  registerPageActions(
    "devices",
    devicesPageActions,
  );

  registerPageActions(
    "locks",
    locksPageActions,
  );

  registerPageActions(
    "security",
    securityPageActions,
  );
}
