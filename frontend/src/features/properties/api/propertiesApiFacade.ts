import {
  listPropertiesApi,
} from "./runtime/listPropertiesApi";

import {
  getPropertiesApi,
} from "./runtime/getPropertiesApi";

import {
  createPropertiesApi,
} from "./runtime/createPropertiesApi";

import {
  updatePropertiesApi,
} from "./runtime/updatePropertiesApi";

import {
  deletePropertiesApi,
} from "./runtime/deletePropertiesApi";

export const propertiesApiFacade = {
  list:
    listPropertiesApi,

  get:
    getPropertiesApi,

  create:
    createPropertiesApi,

  update:
    updatePropertiesApi,

  delete:
    deletePropertiesApi,
};
