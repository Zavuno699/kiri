import {
  devicesApiClient,
} from "../../api/canonical/clients/client";

export const devicesCanonicalService = {
  list: (
    context?: Parameters<
      typeof devicesApiClient.list
    >[0],
  ) =>
    devicesApiClient.list(
      context,
    ),

  get: (
    id: string,
    context?: Parameters<
      typeof devicesApiClient.get
    >[1],
  ) =>
    devicesApiClient.get(
      id,
      context,
    ),
};
