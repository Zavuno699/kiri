import {
  listLocksApi,
} from "./runtime/listLocksApi";

import {
  getLocksApi,
} from "./runtime/getLocksApi";

import {
  createLocksApi,
} from "./runtime/createLocksApi";

import {
  updateLocksApi,
} from "./runtime/updateLocksApi";

import {
  deleteLocksApi,
} from "./runtime/deleteLocksApi";

export const locksApiFacade = {
  list:
    listLocksApi,

  get:
    getLocksApi,

  create:
    createLocksApi,

  update:
    updateLocksApi,

  delete:
    deleteLocksApi,
};
