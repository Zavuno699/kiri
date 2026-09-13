import {
  loadLeasesPage,
} from "./loadLeasesPage";

import {
  getLeasesPageState,
} from "../state/leasesPageState";

import {
  markDomainPageStale,
} from "../../../application/ui/runtime/markDomainPageStale";

export const leasesPageController = {
  load:
    loadLeasesPage,

  state:
    getLeasesPageState,

  invalidate() {
    markDomainPageStale(
      "leases",
    );
  },
};
