import {
  paymentsApiClient,
} from "../../api/canonical/clients/client";

export const paymentsCanonicalService = {
  list: (
    context?: Parameters<
      typeof paymentsApiClient.list
    >[0],
  ) =>
    paymentsApiClient.list(
      context,
    ),

  get: (
    id: string,
    context?: Parameters<
      typeof paymentsApiClient.get
    >[1],
  ) =>
    paymentsApiClient.get(
      id,
      context,
    ),
};
