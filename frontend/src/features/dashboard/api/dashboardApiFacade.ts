import {
  listDashboardApi,
} from "./runtime/listDashboardApi";

import {
  getDashboardApi,
} from "./runtime/getDashboardApi";

import {
  createDashboardApi,
} from "./runtime/createDashboardApi";

import {
  updateDashboardApi,
} from "./runtime/updateDashboardApi";

import {
  deleteDashboardApi,
} from "./runtime/deleteDashboardApi";

export const dashboardApiFacade = {
  list:
    listDashboardApi,

  get:
    getDashboardApi,

  create:
    createDashboardApi,

  update:
    updateDashboardApi,

  delete:
    deleteDashboardApi,
};
