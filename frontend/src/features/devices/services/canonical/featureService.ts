import {
  devicesApiClient,
} from "../../api/canonical/clients/client";

export const devicesCanonicalService = {
  list: () =>
    devicesApiClient.list(),

  get: (
    id: string,
  ) =>
    devicesApiClient.get(id),
};
