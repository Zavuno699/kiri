import {
  listDevicesApi,
} from "./runtime/listDevicesApi";

import {
  getDevicesApi,
} from "./runtime/getDevicesApi";

import {
  createDevicesApi,
} from "./runtime/createDevicesApi";

import {
  updateDevicesApi,
} from "./runtime/updateDevicesApi";

import {
  deleteDevicesApi,
} from "./runtime/deleteDevicesApi";

export const devicesApiFacade = {
  list:
    listDevicesApi,

  get:
    getDevicesApi,

  create:
    createDevicesApi,

  update:
    updateDevicesApi,

  delete:
    deleteDevicesApi,
};
