import {
  loadSecurityPage,
} from "./loadSecurityPage";

import {
  getSecurityPageState,
} from "../state/securityPageState";

import {
  markDomainPageStale,
} from "../../../../application/ui/runtime/markDomainPageStale";

export const securityPageController = {
  load:
    loadSecurityPage,

  state:
    getSecurityPageState,

  invalidate() {
    markDomainPageStale(
      "security",
    );
  },
};
