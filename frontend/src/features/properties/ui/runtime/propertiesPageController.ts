import {
  loadPropertiesPage,
} from "./loadPropertiesPage";

import {
  getPropertiesPageState,
} from "../state/propertiesPageState";

import {
  markDomainPageStale,
} from "../../../../application/ui/runtime/markDomainPageStale";

export const propertiesPageController = {
  load:
    loadPropertiesPage,

  state:
    getPropertiesPageState,

  invalidate() {
    markDomainPageStale(
      "properties",
    );
  },
};
