import {
  paymentsApiClient,
} from "../../api/canonical/clients/client";

export const paymentsCanonicalService = {
  list: () =>
    paymentsApiClient.list(),

  get: (
    id: string,
  ) =>
    paymentsApiClient.get(id),
};
