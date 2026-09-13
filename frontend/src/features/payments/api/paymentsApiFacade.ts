import {
  listPaymentsApi,
} from "./runtime/listPaymentsApi";

import {
  getPaymentsApi,
} from "./runtime/getPaymentsApi";

import {
  createPaymentsApi,
} from "./runtime/createPaymentsApi";

import {
  updatePaymentsApi,
} from "./runtime/updatePaymentsApi";

import {
  deletePaymentsApi,
} from "./runtime/deletePaymentsApi";

export const paymentsApiFacade = {
  list:
    listPaymentsApi,

  get:
    getPaymentsApi,

  create:
    createPaymentsApi,

  update:
    updatePaymentsApi,

  delete:
    deletePaymentsApi,
};
