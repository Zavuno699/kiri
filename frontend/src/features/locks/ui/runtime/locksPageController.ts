import {
  loadLocksPage,
} from "./loadLocksPage";

import {
  getLocksPageState,
} from "../state/locksPageState";

import {
  markDomainPageStale,
} from "../../../application/ui/runtime/markDomainPageStale";

export const locksPageController = {
  load:
    loadLocksPage,

  state:
    getLocksPageState,

  invalidate() {
    markDomainPageStale(
      "locks",
    );
  },
};
