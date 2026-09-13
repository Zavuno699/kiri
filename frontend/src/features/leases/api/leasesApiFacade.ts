import {
  listLeasesApi,
} from "./runtime/listLeasesApi";

import {
  getLeasesApi,
} from "./runtime/getLeasesApi";

import {
  createLeasesApi,
} from "./runtime/createLeasesApi";

import {
  updateLeasesApi,
} from "./runtime/updateLeasesApi";

import {
  deleteLeasesApi,
} from "./runtime/deleteLeasesApi";

export const leasesApiFacade = {
  list:
    listLeasesApi,

  get:
    getLeasesApi,

  create:
    createLeasesApi,

  update:
    updateLeasesApi,

  delete:
    deleteLeasesApi,
};
