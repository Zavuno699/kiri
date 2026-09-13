import {
  listSecurityApi,
} from "./runtime/listSecurityApi";

import {
  getSecurityApi,
} from "./runtime/getSecurityApi";

import {
  createSecurityApi,
} from "./runtime/createSecurityApi";

import {
  updateSecurityApi,
} from "./runtime/updateSecurityApi";

import {
  deleteSecurityApi,
} from "./runtime/deleteSecurityApi";

export const securityApiFacade = {
  list:
    listSecurityApi,

  get:
    getSecurityApi,

  create:
    createSecurityApi,

  update:
    updateSecurityApi,

  delete:
    deleteSecurityApi,
};
